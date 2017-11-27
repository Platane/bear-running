import { h, Component } from 'preact'
import { Link } from '~/component/Link'

export const Header = ({ user, login, logout }) => (
  <header>
    <Link href="currentRun"> current run </Link>

    <Link href="run"> my run </Link>

    {!user && (
      <a href="#" onClick={login}>
        login
      </a>
    )}

    {user && <span>{user.name}</span>}

    {user && (
      <a href="#" onClick={logout}>
        logout
      </a>
    )}
  </header>
)
