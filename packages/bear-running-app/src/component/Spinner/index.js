import { h, Component } from 'preact'
import { black } from '~/component/_abstract/palette'
import styled, { keyframes } from 'preact-emotion'

export const Spinner = ({ color, className, style }) => (
  <Container style={style} className={className}>
    <Center>
      <Dot k={0} color={color} />
      <Dot k={1} color={color} />
      <Dot k={2} color={color} />
    </Center>
  </Container>
)

const animation = keyframes`
  0%{ transform:scale(1,1)};
  30%{ transform:scale(1.5,1.5)};
  60%{ transform:scale(1,1)};
  100%{ transform:scale(1,1)};
`

const Center = styled.div`
  display: flex;
  flex-direction: row;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Dot = styled.div`
  width: 8px;
  height: 8px;
  margin: 2px;
  border-radius: 50%;
  background-color: ${props => props.color || black};
  animation-duration: 450ms;
  animation-delay: ${props => props.k * 150}ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-name: ${animation};
`
