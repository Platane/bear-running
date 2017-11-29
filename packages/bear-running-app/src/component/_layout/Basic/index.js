import { h, Component } from 'preact'
import { Header } from '~/component/Header'
import { Footer } from '~/component/Footer'
import { grey } from '~/component/_abstract/palette'
import styled from 'preact-emotion'

export const BasicLayout = ({ children }) => (
  <Container>
    <Header />
    <Content>{children}</Content>
    <Footer />
  </Container>
)

const Container = styled.div`
  background-color: ${grey};
  display: flex;
  flex-direction: column;
  min-height: 100%;
`
const Content = styled.div`
  flex-grow: 1;
  flex-basis: 100px;
`
