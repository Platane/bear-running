import { h, Component } from 'preact'
import { Header } from '~/component/Header'
import { Link } from '~/component/Link'

const AdminHeader = () => (
  <header>
    <Link href="/admin/user"> users </Link>
  </header>
)

export const AdminLayout = ({ children }) => (
  <div>
    <Header />
    <AdminHeader />
    <section>{children}</section>
    <footer />
  </div>
)
