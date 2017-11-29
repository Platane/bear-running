import { h, Component } from 'preact'

export const Link = ({ href, goTo, children, ...props }) => (
  <a
    href={href}
    {...props}
    onClick={e => {
      e.preventDefault()
      goTo(href)
    }}
  >
    {children}
  </a>
)
