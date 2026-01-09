"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"

function ResetPasswordContent() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isValidToken, setIsValidToken] = useState(false)
  const [checkingToken, setCheckingToken] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const checkToken = async () => {
      try {
        setCheckingToken(true)
        const code = searchParams.get("code")

        console.log("[Reset Password] Código recibido:", code)

        if (!code) {
          console.error("[Reset Password] No se encontró código")
          setError("El enlace de recuperación no es válido. Por favor, solicita uno nuevo.")
          setIsValidToken(false)
          setCheckingToken(false)
          return
        }

        // Intercambiar el código por una sesión
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
        
        if (exchangeError) {
          console.error("[Reset Password] Error al intercambiar código:", exchangeError)
          setError("El enlace de recuperación no es válido o ha expirado. Por favor, solicita uno nuevo.")
          setIsValidToken(false)
        } else {
          console.log("[Reset Password] Código intercambiado exitosamente")
          setIsValidToken(true)
          setError("")
        }
      } catch (err: any) {
        console.error("[Reset Password] Error inesperado:", err)
        setError("Ocurrió un error al verificar el enlace. Por favor, inténtalo de nuevo.")
        setIsValidToken(false)
      } finally {
        setCheckingToken(false)
      }
    }

    checkToken()
  }, [searchParams, supabase.auth])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    setLoading(true)

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      })

      if (updateError) {
        console.error("[Reset Password] Error al actualizar contraseña:", updateError)
        setError(updateError.message || "Error al actualizar la contraseña")
        setLoading(false)
        return
      }

      console.log("[Reset Password] Contraseña actualizada exitosamente")
      setSuccess(true)
      setLoading(false)

      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (err: any) {
      console.error("[Reset Password] Error inesperado:", err)
      setError(err.message || "Ocurrió un error al actualizar la contraseña")
      setLoading(false)
    }
  }

  if (checkingToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-bg px-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-xl border border-border p-8 shadow-lg text-center">
            <div className="flex justify-center mb-6">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
            <h1 className="text-xl font-semibold text-foreground mb-2">
              Verificando enlace de recuperación...
            </h1>
            <p className="text-secondary-text">Por favor, espera un momento.</p>
          </div>
        </div>
      </div>
    )
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
              <h1 className="text-2xl font-bold text-foreground mb-4">Contraseña Actualizada</h1>
              <p className="text-secondary-text mb-6">
                Tu contraseña ha sido actualizada exitosamente. Serás redirigido al inicio de sesión en unos momentos.
              </p>
              <Link
                href="/login"
                className="inline-block bg-primary text-primary-foreground font-medium px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
              >
                Ir al Inicio de Sesión
              </Link>
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
            <h1 className="text-2xl font-bold text-foreground">Restablecer Contraseña</h1>
            <p className="text-secondary-text mt-2">Ingresa tu nueva contraseña</p>
          </div>

          {!isValidToken ? (
            <div className="space-y-6">
              <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
                <p className="text-sm text-destructive text-center">
                  {error || "El enlace de recuperación no es válido o ha expirado."}
                </p>
              </div>
              <div className="space-y-3">
                <Link
                  href="/login"
                  className="block w-full text-center bg-primary text-primary-foreground font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Volver al Inicio de Sesión
                </Link>
                <Link
                  href="/auth/forgot-password"
                  className="block w-full text-center text-primary hover:underline text-sm py-2"
                >
                  Solicitar nuevo enlace
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
              {error && (
                <div className="bg-destructive/10 border border-destructive rounded-lg p-3">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Nueva Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-text hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-secondary-text mt-1">Mínimo 6 caracteres</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-text hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Actualizando...
                  </>
                ) : (
                  "Actualizar Contraseña"
                )}
              </button>
            </form>
          )}

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

function ResetPasswordLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-bg px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-xl border border-border p-8 shadow-lg text-center">
          <div className="flex justify-center mb-6">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
          <h1 className="text-xl font-semibold text-foreground mb-2">
            Cargando...
          </h1>
          <p className="text-secondary-text">Por favor, espera un momento.</p>
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordContent />
    </Suspense>
  )
}
