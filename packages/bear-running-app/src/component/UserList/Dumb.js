import { h, Component } from 'preact'
import { Trace as Trace_ } from '~/component/Trace'
import { Link } from '~/component/Link'
import { Spinner } from '~/component/Spinner'
import { TeamSwitch } from '~/component/TeamSwitch'
import { primary, secondary, black, white } from '~/component/_abstract/palette'
import styled from 'preact-emotion'

export const UserList = ({ users, loading, haveMore, loadMore }) => (
  <Container>
    <List>
      {users.map(user => (
        <Row key={user.id} href={`/user/${user.id}`}>
          <Portrait src={user.picture} />
          <Name>{user.name}</Name>
          <Team team={user.team} ticStyle={{ width: '40px', height: '40px' }} />
        </Row>
      ))}
    </List>

    <Footer>
      {haveMore && !loading && <button onClick={loadMore}>load more</button>}
      {loading && <Spinner color={primary} />}
    </Footer>
  </Container>
)

const Footer = styled.div`
  margin-top: 40px;
`
const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const Row = styled(Link)`
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  text-decoration: none;

  border-bottom: solid 1px rgba(255, 255, 255, 0.2);

  &:last-child {
    border-bottom-color: transparent;
  }
`

const Team = styled(TeamSwitch)`
  border-radius: 50%;
  box-shadow: 16px 13px 18px -8px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
`

const Portrait = styled.div`
  background-color: ${white};
  flex-shrink: 0;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.src});
  box-shadow: 16px 13px 18px -8px rgba(0, 0, 0, 0.2);
`

const Name = styled.div`
  margin-left: 5%;
  flex: 100px 1 1;
  margin-top: 30px;
  color: ${white};
  font-size: 16px;
  letter-spacing: 1.1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
