import { h, Component } from 'preact'
import { Link } from '~/component/Link'
import { runLength, runDuration } from '~/service/runStat'
import {
  primary,
  secondary,
  black,
  grey,
  white,
} from '~/component/_abstract/palette'
import styled from 'preact-emotion'
import { formatDate, formatLength, formatDuration } from '~/util/format'

export const CurrentRun = ({
  startRun,
  endRun,
  saveRun,
  currentRun,
  running,
}) => (
  <Container>
    {!currentRun && (
      <Circle style={{ cursor: 'pointer' }} onClick={startRun}>
        start
      </Circle>
    )}
    {currentRun && (
      <Circle
        style={{ cursor: 'pointer' }}
        onClick={running ? endRun : saveRun}
      >
        <span>{formatDuration(runDuration(currentRun.steps))}</span>
        <Label>{running ? 'end run' : 'save'}</Label>
        <Length>
          <LengthValue>{formatLength(runLength(currentRun.steps))}</LengthValue>
          <LengthLabel> km</LengthLabel>
        </Length>
      </Circle>
    )}
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top:0;
  left: 0;
  bottom: 0
  right:0;
`

const Circle = styled.div`
  height: 220px;
  width: 220px;
  border: solid 6px ${primary};
  background-color: rgba(0, 0, 0, 0.1);
  color: ${primary};
  font-size: 50px;
  letter-spacing: 4px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`
const Label = styled.div`
  position: absolute;
  bottom: 30px;
  font-size: 26px;
`

const Length = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${black};
  border: solid 4px ${primary};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: -70px;
  right: -40px;
`
const LengthValue = styled.span`
  font-size: 32px;
  letter-spacing: 0px;
  font-weight: bold;
  color: ${primary};
`
const LengthLabel = styled.span`
  position: absolute;
  letter-spacing: 0px;
  bottom: 2px;
  right: -24px;
  font-size: 16px;
  color: ${primary};
`
