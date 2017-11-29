import { h, Component } from 'preact'
import { Link } from '~/component/Link'
import styled from 'preact-emotion'

export const UserMenu = ({ opened, userId, user, toggle, logout, close }) => (
  <Container onClick={toggle} onBlur={close}>
    <Portrait src={user && user.picture} />
    {opened && (
      <Panel>
        <Row>
          signed as
          <b style={{ marginLeft: '6px' }}> {(user && user.name) || '- - -'}</b>
        </Row>
        <Row>
          <a href="#" onClick={logout}>
            logout
          </a>
        </Row>
      </Panel>
    )}
  </Container>
)

const Portrait = styled.div`
  background-color: #eee;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.src});
`

const Container = styled.div`
  position: relative;
`
const Panel = styled.div`
  width: 190px;
  position: absolute;
  top: 45px;
  right: -10px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 1px 2px 8px 0px rgba(0, 0, 0, 0.3);
  align-items: stretch;
`
const Row = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: solid 1px #eee;

  &:last-child {
    border-bottom-color: transparent;
  }
`
