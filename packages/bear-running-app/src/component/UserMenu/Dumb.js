import { h, Component } from 'preact'
import { Link } from '~/component/Link'
import { TeamSwitch } from '~/component/TeamSwitch'
import {
  primary,
  secondary,
  black,
  grey,
  white,
} from '~/component/_abstract/palette'
import styled from 'preact-emotion'

export const UserMenu = ({
  opened,
  userId,
  role,
  user,
  changeTeam,
  toggle,
  logout,
  close,
}) => (
  <Container onClick={toggle} onBlur={close}>
    <Portrait src={user && user.picture} />
    {opened && (
      <Panel>
        <Row>
          signed as
          <b style={{ marginLeft: '6px' }}> {(user && user.name) || '- - -'}</b>
        </Row>
        {['admin', 'userManager'].includes(role) && (
          <Row>
            <b>{role}</b>
          </Row>
        )}
        <Row onClick={e => e.stopPropagation()} style={{ marginTop: '10px' }}>
          team
          <TeamSwitch
            onChange={user && (team => changeTeam(user.id, team))}
            style={{ marginLeft: 'auto' }}
            team={user && user.team}
          />
        </Row>
        <Row separator>
          <a href="#" onClick={logout}>
            logout
          </a>
        </Row>
      </Panel>
    )}
  </Container>
)

const Portrait = styled.div`
  cursor: pointer;
  background-color: ${white};
  height: 44px;
  width: 44px;
  border: solid 4px ${secondary};
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
  z-index: 2;
  top: 45px;
  right: -10px;
  padding: 10px;
  background-color: ${white};
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 1px 2px 8px 0px rgba(0, 0, 0, 0.5);
  align-items: stretch;
`
const Row = styled.div`
  height: 40px;
  display: flex;
  color: ${black};
  flex-direction: row;
  align-items: center;
  border-top: solid 1px ${props => (props.separator ? '#ccc' : 'transparent')};

  & > a {
    color: ${black};
  }

  &:first-child {
    border-top-color: transparent;
  }
`
