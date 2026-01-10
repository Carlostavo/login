"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    // Mensajes de error más específicos
    if (error.message.includes("Invalid login credentials")) {
      return { error: "Correo o contraseña incorrectos" }
    }
    if (error.message.includes("Email not confirmed")) {
      return { error: "Por favor, confirma tu correo electrónico" }
    }
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  redirect("/")
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get("email") as string

  if (!email) {
    return { error: "Por favor, ingresa tu correo electrónico" }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://login-umber-kappa.vercel.app"
  const redirectUrl = `${siteUrl}/auth/callback?next=/auth/update-password`

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl,
  })

  if (error) {
    if (error.message.includes("User not found")) {
      return { error: "No existe una cuenta con este correo electrónico" }
    }
    return { error: "Error al enviar el correo. Intenta de nuevo." }
  }

  return { success: true }
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()
  const password = formData.get("password") as string

  if (!password || password.length < 6) {
    return { error: "La contraseña debe tener al menos 6 caracteres" }
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) {
    return { error: "Error al actualizar la contraseña. Intenta de nuevo." }
  }

  return { success: true }
}
