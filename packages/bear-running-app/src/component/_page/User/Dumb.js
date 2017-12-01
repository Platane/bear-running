import { h, Component } from 'preact'
import { Link } from '~/component/Link'
import { Spinner } from '~/component/Spinner'
import { TeamSwitch } from '~/component/TeamSwitch'
import { UserRunList } from '~/component/UserRunList'
import { UserRunListWithRange } from '~/component/UserRunListWithRange'
import { primary, secondary, black, white } from '~/component/_abstract/palette'
import styled from 'preact-emotion'

export const User = ({
  changeTeam,
  changeWeather,
  removeRun,
  userId,
  user,
}) => (
  <Container>
    <PortratWrapper>
      <Portrait src={user && user.picture} />
      <Team
        onChange={user && changeTeam && (team => changeTeam(user.id, team))}
        team={user && user.team}
        ticStyle={{ width: '56px', height: '56px' }}
      />
    </PortratWrapper>
    <Name>{(user && user.name) || <Spinner color={primary} />}</Name>

    <Center>
      <UserRunListWithRange
        userId={userId}
        changeWeather={changeWeather}
        removeRun={removeRun}
      />
    </Center>
  </Container>
)

const Team = styled(TeamSwitch)`
  position: absolute;
  bottom: -20px;
  right: -60px;
  border-radius: 50%;
  box-shadow: 16px 13px 18px -8px rgba(0, 0, 0, 0.2);
`

const PortratWrapper = styled.div`
  position: relative;
`
const Portrait = styled.div`
  background-color: ${white};
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.src});
  box-shadow: 16px 13px 18px -8px rgba(0, 0, 0, 0.2);
`
const Container = styled.div`
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Name = styled.div`
  margin-top: 30px;
  color: ${primary};
  font-size: 40px;
  letter-spacing: 4px;
`
const Center = styled.div`
  margin-top: 50px;
  max-width: 500px;
  width: 100%;
`
