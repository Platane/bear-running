import { h, Component } from 'preact'
import { BasicLayout } from '~/component/_layout/Basic'

const BasicApp = ({ routerKey, routerParam }) => {
  switch (routerKey) {
    default:
      return null
  }
}

export const App = ({ routerKey, routerParam }) => {
  // if (routerKey === 'home') return null

  // if (['myRuns'].includes(routerKey)) return null

  // if (routerKey.includes('admin'))
  //   return <AdminApp routerKey={routerKey} routerParam={routerParam} />

  switch (routerKey) {
    case 'home':
      return null

    case 'currentRun':
    case 'myRuns':
      return (
        <BasicLayout>
          <BasicApp routerKey={routerKey} routerParam={routerParam} />
        </BasicLayout>
      )

    default:
      return <article />
  }
}
