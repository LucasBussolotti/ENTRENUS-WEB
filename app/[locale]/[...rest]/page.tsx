import { notFound } from 'next/navigation'

// Cualquier URL desconocida bajo /es o /en cae acá y muestra el not-found del
// idioma, con menú y pie. Sin esta ruta Next usaba su 404 genérico en inglés.
export default function CatchAllPage() {
  notFound()
}
