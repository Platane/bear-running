import { h, Component } from 'preact'
import { Link } from '~/component/Link'
import { Spinner } from '~/component/Spinner'
import { Logo as Logo_ } from '~/component/Logo'
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
  status,
  changeCurrentRunWeather,
}) => (
  <Container>
    {!currentRun && (
      <Circle style={{ cursor: 'pointer' }} onClick={startRun}>
        <Logo color={primary} />
        <Label>start</Label>
      </Circle>
    )}
    {currentRun && (
      <Circle
        style={{ cursor: 'pointer' }}
        onClick={
          (status === 'running' && endRun) ||
          (status === 'ended' && saveRun) ||
          null
        }
      >
        <span>{formatDuration(runDuration(currentRun.steps))}</span>
        {status === 'running' && <Label>end run</Label>}
        {status === 'ended' && <Label>save</Label>}
        {status === 'saving' && (
          <Label>
            <Spinner color={primary} />
          </Label>
        )}
        <Length>
          <LengthValue>{formatLength(runLength(currentRun.steps))}</LengthValue>
          <LengthLabel> km</LengthLabel>
        </Length>
      </Circle>
    )}

    {currentRun && (
      <Weather>
        <select
          value={currentRun.weather}
          onChange={e => changeCurrentRunWeather(e.target.value)}
        >
          <option value="sunny">sunny</option>
          <option value="rainy">rainy</option>
          <option value="cloudy">cloudy</option>
          <option value="stormy">stormy</option>
          <option value="banana">banana</option>
        </select>
      </Weather>
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
const Logo = styled(Logo_)`
  width: 120px;
  height: 120px;
  margin-bottom: 40px;
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
const Weather = styled.div`
  position: absolute;
  bottom: 70px;
  left: 40px;
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
