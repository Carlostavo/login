"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Loader2, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Configurar la URL de redirección para PKCE
      const redirectTo = `${window.location.origin}/auth/reset-password`

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectTo,
      })

      if (resetError) {
        console.error("[Forgot Password] Error:", resetError)
        setError(resetError.message || "Error al enviar el correo de recuperación")
        setLoading(false)
        return
      }

      console.log("[Forgot Password] Correo enviado exitosamente")
      setSuccess(true)
      setLoading(false)
    } catch (err: any) {
      console.error("[Forgot Password] Error inesperado:", err)
      setError(err.message || "Ocurrió un error inesperado")
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-bg px-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-4">Correo Enviado</h1>
              <p className="text-secondary-text mb-6">
                Se ha enviado un enlace de recuperación a <strong>{email}</strong>. 
                Por favor, revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
              </p>
              <div className="space-y-3">
                <Link
                  href="/login"
                  className="block w-full text-center bg-primary text-primary-foreground font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Volver al Inicio de Sesión
                </Link>
                <button
                  onClick={() => {
                    setSuccess(false)
                    setEmail("")
                  }}
                  className="block w-full text-center text-primary hover:underline text-sm py-2"
                >
                  Enviar otro correo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-bg px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/30">
                <Image
                  src="/images/ingenieria-20-282-29.jpeg"
                  alt="Logo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 128px) 100vw, 128px"
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground">¿Olvidaste tu contraseña?</h1>
            <p className="text-secondary-text mt-2">
              Ingresa tu correo electrónico para recibir un enlace de recuperación
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 border border-destructive rounded-lg p-3">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar enlace de recuperación"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-secondary-text hover:text-foreground">
              Volver al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}