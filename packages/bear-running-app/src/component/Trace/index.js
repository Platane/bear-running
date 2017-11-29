import { h, Component } from 'preact'
import { white, black } from '~/component/_abstract/palette'
import styled from 'preact-emotion'

const toBox = points => {
  const xs = points.map(x => x.x)
  const ys = points.map(x => x.y)

  return {
    max: { x: Math.max(...xs), y: Math.max(...ys) },
    min: { x: Math.min(...xs), y: Math.min(...ys) },
  }
}

const toPath = ({ min, max }, points) =>
  'M' +
  points
    .map(({ x, y }) =>
      [
        (x - min.x) / (max.x - min.x) * 100,
        (y - min.y) / (max.y - min.y) * 100,
      ].join(' ')
    )
    .join('L')

export const Trace = ({ steps, color, ...props }) => {
  let path = ''

  if (steps.length > 1) {
    const points = steps.map(({ geoloc: { lat, lng } }) => ({ x: lat, y: lng }))

    const box = toBox(points)

    const lx = box.max.x - box.min.x
    const ly = box.max.y - box.min.y

    const max = Math.max(lx, ly)

    if (lx > 0 && ly > 0) {
      const mx = (max - lx) / 2
      const my = (max - ly) / 2

      box.min.x -= mx
      box.min.y -= my
      box.max.x += mx
      box.max.y += my

      path = toPath(box, points)
    }
  }

  return (
    <svg viewBox="-5 -5 110 110" {...props}>
      <path stroke-width={2} stroke={color} fill="none" d={path} />
    </svg>
  )
}
