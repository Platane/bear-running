import { h, Component } from 'preact'
import { TeamSwitch } from '~/component/TeamSwitch'

const createChangeRole = (updateUserRole, userId) => e =>
  updateUserRole(userId, e.target.value)

const createRemoveUser = (removeUser, userId) => () => removeUser(userId)

const createUpdateTeam = (updateUser, userId) => team =>
  updateUser({ team, id: userId })

export const UserList = ({
  users,
  haveMore,
  loadMore,
  updateUser,
  updateUserRole,
  removeUser,
}) => (
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
            <option value="user">user</option>
            <option value="userManager">user manager</option>
            <option value="admin">admin</option>
          </select>
        </th>
        <th>
          <TeamSwitch
            team={user.team}
            onChange={createUpdateTeam(updateUser, user.id)}
          />
        </th>
        <th>
          <button onClick={createRemoveUser(removeUser, user.id)}>
            remove
          </button>
        </th>
      </tr>
    ))}
    {haveMore && <button onClick={loadMore}>load more</button>}
  </table>
)
