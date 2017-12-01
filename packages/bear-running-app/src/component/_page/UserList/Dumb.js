import { h, Component } from 'preact'
import { UserList as UserList_ } from '~/component/UserList'
import { primary, secondary, black, white } from '~/component/_abstract/palette'
import styled from 'preact-emotion'

export const UserList = ({ changeTeam, userId, user }) => (
  <Container>
    <Center>
      <UserList_ />
    </Center>
  </Container>
)

const Container = styled.div`
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Center = styled.div`
  max-width: 500px;
  width: 100%;
`
