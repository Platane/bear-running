import { h, Component } from 'preact'
import { Link } from '~/component/Link'

export const Header = ({ userId, user, login, logout }) => (
  <header>
    <Link href="currentRun"> current run </Link>

    {userId && <Link href={`user/${userId}`}> my run </Link>}

    {!userId && (
      <a href="#" onClick={login}>
        login
      </a>
    )}

    {user && <span>{user.name}</span>}

    {userId && (
      <a href="#" onClick={logout}>
        logout
      </a>
    )}
  </header>
)
