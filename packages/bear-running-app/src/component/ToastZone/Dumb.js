import { h, Component } from 'preact'
import { Link } from '~/component/Link'
import {
  primary,
  secondary,
  black,
  grey,
  white,
  error,
} from '~/component/_abstract/palette'
import styled, { keyframes } from 'preact-emotion'

export const ToastZone = ({ toDisplay, close }) => (
  <Container>
    {toDisplay.reverse().map((toast, i) => (
      <Toast key={toast.key} style={{ transform: `translateY(${-i * 81}px)` }}>
        {(toast.content || 'error').split('\n').filter(Boolean)[0]}
      </Toast>
    ))}
  </Container>
)

const appear = keyframes`
  0%{ opacity: 0;};
  100%{ opacity: 1;};
`

const Container = styled.div``
const Toast = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 280ms ease;
  align-items: center;
  background-color: ${error};
  color: #fff;
  letter-spacing: 0.4px;
  font-family: consolas;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
  animation: ${appear} 280ms ease;
`
