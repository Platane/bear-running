import { h, Component } from 'preact'
import { UserMenu } from '~/component/UserMenu'
import { Link } from '~/component/Link'
import { white, black } from '~/component/_abstract/palette'
import styled from 'preact-emotion'

export const Footer = () => <Container>made with ❤</Container>

const Container = styled.footer`
  background-color: ${black};
  color: ${white};
  height: 28px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
