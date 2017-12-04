import { h, Component } from 'preact'
import { Link } from '~/component/Link'
import { Logo as Logo_ } from '~/component/Logo'
import { black, grey, primary } from '~/component/_abstract/palette'
import styled, { keyframes } from 'preact-emotion'

export const SplashScreen = () => (
  <Container href="/" style={{ color: black }}>
    <Logo color={grey} />
    <Label>enter</Label>
  </Container>
)

const appear = keyframes`
  0%{ opacity: 0; transform: scale(0.8,0.8)}
  60%{ opacity: 1; transform: scale(1.1,1.1)}
  80%{ opacity: 1; transform: scale(0.95,0.95)}
  100%{ opacity: 1; transform: scale(1,1)}
`

const Logo = styled(Logo_)`
  width: 60%;
  height: 60%;
  animation: ${appear} 350ms linear;
`
const Label = styled.div`
  margin-top: 40px;
`
const Container = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
