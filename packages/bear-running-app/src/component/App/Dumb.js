import { h, Component } from 'preact'
import { BasicLayout } from '~/component/_layout/Basic'
import { AdminLayout } from '~/component/_layout/Admin'
import { CurrentRun } from '~/component/_page/CurrentRun'
import { SplashScreen } from '~/component/_page/SplashScreen'
import { ToastZone } from '~/component/ToastZone'
import { UserList as AdminUserList } from '~/component/_page/Admin/UserList'
import { UserList } from '~/component/_page/UserList'
import { UserStats } from '~/component/_page/UserStats'
import { User } from '~/component/_page/User'
import { Run } from '~/component/_page/Run'
const Home = UserList

const now = Date.now() + 60 * 60 * 1000

const BasicApp = ({ routerKey, routerParam }) => {
  switch (routerKey) {
    case 'user':
      return <User userId={routerParam.userId} />

    case 'userStats':
      return (
        <UserStats
          userId={routerParam.userId}
          start={now - 60 * 60 * 1000 * 24 * 7}
          end={now}
        />
      )

    case 'run':
      return <Run userId={routerParam.userId} runId={routerParam.runId} />

    case 'home':
      return <Home />

    case 'userList':
      return <UserList />

    case 'currentRun':
      return <CurrentRun />
    default:
      return null
  }
}

const AdminApp = ({ routerKey, routerParam }) => {
  switch (routerKey) {
    default:
      return <AdminUserList />
  }
}

const App_ = ({ routerKey, routerParam }) => {
  switch (routerKey) {
    case 'intro':
      return <SplashScreen />

    case 'currentRun':
    case 'userStats':
    case 'userList':
    case 'user':
    case 'home':
    case 'run':
      return (
        <BasicLayout>
          <BasicApp routerKey={routerKey} routerParam={routerParam} />
        </BasicLayout>
      )

    case 'adminUserList':
      return (
        <AdminLayout>
          <AdminApp routerKey={routerKey} routerParam={routerParam} />
        </AdminLayout>
      )

    default:
      return <article />
  }
}

export const App = props => (
  <div style={{ height: '100%' }}>
    <App_ {...props} />
    <ToastZone />
  </div>
)
