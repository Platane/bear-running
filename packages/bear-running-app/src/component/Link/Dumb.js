import { h, Component } from 'preact'

export const Link = ({ href, goTo, children }) => (
  <a
    href={href}
    onClick={e => {
      e.preventDefault()
      goTo(href)
    }}
  >
    {children}
  </a>
)
