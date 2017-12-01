import { h, Component } from 'preact'
import { Link } from '~/component/Link'
import { primary, secondary, black, grey } from '~/component/_abstract/palette'
import styled from 'preact-emotion'

export const SplashScreen = () => <Container href="/">SplashScreen</Container>

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
