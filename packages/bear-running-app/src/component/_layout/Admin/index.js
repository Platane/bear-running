import { h, Component } from 'preact'
import { Header } from '~/component/Header'
import { Link } from '~/component/Link'
import { Footer } from '~/component/Footer'
import { grey } from '~/component/_abstract/palette'
import styled from 'preact-emotion'

const AdminHeader = () => (
  <header>
    <Link href="/admin/user"> users </Link>
  </header>
)

export const AdminLayout = ({ children }) => (
  <Container>
    <Header />
    <AdminHeader />
    <Content>{children}</Content>
    <Footer />
  </Container>
)

const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`
const Content = styled.div`
  flex-grow: 1;
  flex-basis: 100px;
  position: relative;
`
