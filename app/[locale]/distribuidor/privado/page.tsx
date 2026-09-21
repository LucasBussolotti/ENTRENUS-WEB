import { redirect } from 'next/navigation'

/**
 * El área privada de distribuidores dejó de vivir acá: ahora es un enlace directo
 * al portal externo desde /distribuidor.
 *
 * La ruta se conserva como redirección en vez de borrarse para no romper enlaces
 * guardados. Importa que sea un componente de servidor: la versión anterior era
 * un `"use client"` que comparaba la contraseña en el navegador, así que la
 * credencial viajaba en texto plano dentro del bundle.
 */
export default async function PrivateDistributorRedirect({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  redirect(`/${locale}/distribuidor`)
}
