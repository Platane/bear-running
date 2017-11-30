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
      <Toast
        key={toast.key}
        type={toast.type}
        style={{ transform: `translateY(${-i * 81}px)` }}
        onClick={() => close(toast.key)}
      >
        <ToastLabel>
          {(toast.content || 'error').split('\n').filter(Boolean)[0]}
        </ToastLabel>
        <CloseButton>×</CloseButton>
      </Toast>
    ))}
  </Container>
)

const appear = keyframes`
  0%{ opacity: 0;};
  100%{ opacity: 1;};
`

const Container = styled.div``
const CloseButton = styled.div`
  flex: 40px 0 1;
  font-size: 32px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const Toast = styled.div`
  cursor: pointer;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  transition: transform 280ms ease;
  align-items: center;
  background-color: ${props => (props.type === 'error' && error) || white};
  color: ${props => (props.type === 'error' && '#fff') || black};
  letter-spacing: 0.4px;
  font-family: consolas;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
  animation: ${appear} 280ms ease;
`
const ToastLabel = styled.div`
  flex: 200px 1 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
`
