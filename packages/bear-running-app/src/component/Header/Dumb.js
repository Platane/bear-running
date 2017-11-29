import { h, Component } from 'preact'
import { UserMenu } from '~/component/UserMenu'
import { Link } from '~/component/Link'
import styled from 'preact-emotion'

export const Header = ({ userId, login }) => (
  <Container>
    <Center>
      <Left>
        <Link href="currentRun">
          <Tab>current run</Tab>
        </Link>

        {userId && (
          <Link href={`user/${userId}`}>
            <Tab>my run</Tab>
          </Link>
        )}
      </Left>

      <Right>
        {userId && <UserMenu />}
        {!userId && (
          <a href="#" onClick={login}>
            login
          </a>
        )}
      </Right>
    </Center>
  </Container>
)

const Container = styled.header`
  background-color: #fff;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.06);
`
const Center = styled.div`
  max-width: 800px;
  margin: 0 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Tab = styled.span`
  margin: 0 10px;
`

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Right = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
`
