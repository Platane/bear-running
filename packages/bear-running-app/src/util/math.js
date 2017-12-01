export const clamp = (min: number, max: number) => (x: number) =>
  Math.min(max, Math.max(min, x))

export const lerp = (min: number, max: number) => (x: number) =>
  (1 - x) * min + x * max

export const proj = (min: number, max: number) => (x: number) =>
  (x - min) / (max - min)

// ease-in-out function
export const ease = (alpha: number) => (x: number) =>
  Math.pow(x, alpha) / (Math.pow(x, alpha) + Math.pow(1 - x, alpha))

// clamp to Unit
export const clampU = clamp(0, 1)
