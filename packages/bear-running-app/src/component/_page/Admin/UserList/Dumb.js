import { h, Component } from 'preact'
import { Link } from '~/component/Link'

const createChangeRole = (updateUserRole, userId) => e =>
  updateUserRole(userId, e.target.value)

const createRemoveUser = (removeUser, userId) => () => removeUser(userId)

export const UserList = ({ users, updateUserRole, removeUser }) => (
  <table>
    {users.map(user => (
      <tr key={user.id}>
        <th>
          <div
            style={{
              backgroundImage: `url(${user.picture})`,
              backgroundSize: `cover`,
              width: '30px',
              height: '30px',
            }}
          />
        </th>
        <th> {user.name}</th>
        <th>
          <select
            onChange={createChangeRole(updateUserRole, user.id)}
            value={user.role || 'user'}
          >
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>
        </th>
        <th>
          <button onClick={createRemoveUser(removeUser, user.id)}>
            remove
          </button>
        </th>
      </tr>
    ))}
  </table>
)
