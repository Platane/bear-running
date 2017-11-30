import { h, Component } from 'preact'
import { Spinner } from '~/component/Spinner'
import styled from 'preact-emotion'

export const NetworkActivityIndicator = ({ loading, color }) => (
  <Container>
    {loading && (
      <Spinner color={color} style={{ width: '100%', height: '100%' }} />
    )}
  </Container>
)

const Container = styled.header`
  height: 40px;
  width: 40px;
`
