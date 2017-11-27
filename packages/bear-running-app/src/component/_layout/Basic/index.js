import { h, Component } from 'preact'
import { Header } from '~/component/Header'

export const BasicLayout = ({ children }) => (
  <div>
    <Header />
    <section>{children}</section>
    <footer />
  </div>
)
