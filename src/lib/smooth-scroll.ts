import type Lenis from "lenis";

let activeLenis: Lenis | null = null;

export function getLenis() {
  return activeLenis;
}

export function setActiveLenis(instance: Lenis | null) {
  activeLenis = instance;
}
