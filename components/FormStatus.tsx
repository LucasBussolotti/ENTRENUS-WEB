import { CircleAlert, CircleCheck } from 'lucide-react'

export type FormStatusState = { kind: 'success' | 'error'; message: string } | null

/**
 * Reemplaza a los `alert()` que usaban los formularios. Un alert bloquea el hilo,
 * no se puede estilar, se pierde si el navegador lo suprime y no deja rastro en la
 * página para quien vuelve a leerla con un lector de pantalla.
 *
 * Los errores usan role="alert" (interrumpe) y los éxitos role="status" (espera a
 * que el lector termine la frase en curso).
 */
export function FormStatus({ status }: { status: FormStatusState }) {
  if (!status) return null

  const isError = status.kind === 'error'
  const Icon = isError ? CircleAlert : CircleCheck

  return (
    <p
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      className={`flex items-start gap-2 rounded-[1rem] px-4 py-3 text-base font-bold ${
        isError ? 'bg-[#FBE3E3] text-[#8A1C1C]' : 'bg-[#DDF0E3] text-[#16603A]'
      }`}
    >
      <Icon size={20} aria-hidden="true" className="mt-0.5 shrink-0" />
      <span>{status.message}</span>
    </p>
  )
}
