import { h, Component } from 'preact'
import { Link } from '~/component/Link'
import { Spinner } from '~/component/Spinner'
import { Stats } from '~/component/UserRunListWithRange/Stats'
import { primary, secondary, black, white } from '~/component/_abstract/palette'
import styled from 'preact-emotion'

const loadAll = C => ({ haveMore, loading, loadMore, ...props }) => {
  if (!loading && haveMore) loadMore()

  return <C {...props} loading={loading || haveMore} />
}

const UserStats_ = ({ start, end, runs, loading }) => (
  <Container>
    {loading && <Spinner color={primary} />}
    {!loading && <Stats runs={runs} start={start} end={end} />}
  </Container>
)

export const UserStats = loadAll(UserStats_)

const Container = styled.div`
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
