import { h, Component } from 'preact'
import { BasicLayout } from '~/component/_layout/Basic'
import { AdminLayout } from '~/component/_layout/Admin'
import { CurrentRun } from '~/component/_page/CurrentRun'
import { SplashScreen } from '~/component/_page/SplashScreen'
import { User } from '~/component/_page/User'
import { UserList as AdminUserList } from '~/component/_page/Admin/UserList'

const BasicApp = ({ routerKey, routerParam }) => {
  switch (routerKey) {
    case 'user':
      return <User userId={routerParam.userId} />

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

export const App = ({ routerKey, routerParam }) => {
  // if (routerKey === 'home') return null

  // if (['myRuns'].includes(routerKey)) return null

  // if (routerKey.includes('admin'))
  //   return <AdminApp routerKey={routerKey} routerParam={routerParam} />

  switch (routerKey) {
    case 'home':
      return <SplashScreen />

    case 'currentRun':
    case 'myRuns':
    case 'user':
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
