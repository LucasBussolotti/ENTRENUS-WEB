"use client";

import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/*
 * Suaviza sólo la rueda del mouse: en pantallas táctiles el scroll sigue siendo
 * el nativo (syncTouch desactivado) y con prefers-reduced-motion Lenis lo deja
 * 1:1. allowNestedScroll respeta los contenedores con scroll propio (chatbot,
 * menú móvil), los <dialog> modales quedan con su scroll nativo y
 * stopInertiaOnNavigate evita que la inercia siga corriendo cuando un enlace
 * cambia de página y Next.js lleva el scroll arriba.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.12,
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
      prevent: (node) => node.nodeName === 'DIALOG',
    })
    return () => lenis.destroy()
  }, [])

  return null
}
