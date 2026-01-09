"use client"

import { Suspense, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

function AuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code")
      const next = searchParams.get("next") || "/"

      console.log("[Auth Callback] Parámetros recibidos:", { code, next })

      if (!code) {
        console.error("[Auth Callback] No se encontró código en la URL")
        router.push("/login")
        return
      }

      try {
        // Intercambiar el código por una sesión
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
          console.error("[Auth Callback] Error al intercambiar código:", error)
          router.push("/login?error=invalid_code")
          return
        }

        console.log("[Auth Callback] Código intercambiado exitosamente")
        
        // Redirigir según el tipo de operación
        const type = searchParams.get("type")
        
        if (type === "recovery") {
          // Para recuperación de contraseña, redirigir a reset-password con el código
          const tokenHash = searchParams.get("token_hash")
          if (tokenHash) {
            router.push(`/auth/reset-password?token_hash=${tokenHash}&type=recovery`)
          } else {
            router.push("/auth/reset-password?code=" + code)
          }
        } else {
          // Para otros casos, redirigir a la página principal o la especificada
          router.push(next)
        }
      } catch (error) {
        console.error("[Auth Callback] Error inesperado:", error)
        router.push("/login?error=unexpected_error")
      }
    }

    handleCallback()
  }, [router, searchParams, supabase.auth])

  return null
}

// Componente de fallback para Suspense
function CallbackLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary-bg px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <Loader2 className="w-16 h-16 text-primary animate-spin" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Procesando autenticación...
        </h1>
        <p className="text-secondary-text">
          Por favor, espera mientras verificamos tu solicitud.
        </p>
      </div>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<CallbackLoading />}>
      <AuthCallbackContent />
    </Suspense>
  )
}
