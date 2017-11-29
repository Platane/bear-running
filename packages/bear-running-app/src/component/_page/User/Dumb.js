import { h, Component } from 'preact'
import { Link } from '~/component/Link'
import { UserRunList } from '~/component/UserRunList'

export const User = ({ userId, user }) => (
  <div>
    <div
      style={{
        backgroundColor: '#ddd',
        backgroundImage: `url(${user && user.picture})`,
        backgroundSize: `cover`,
        width: '60px',
        height: '60px',
      }}
    />

    <UserRunList userId={userId} />
  </div>
)
