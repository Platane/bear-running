import { h, Component } from 'preact'
import { Trace as Trace_ } from '~/component/Trace'
import { Link } from '~/component/Link'
import { Spinner } from '~/component/Spinner'
import { WeatherSwitch } from '~/component/WeatherSwitch'
import { runLength, runDuration } from '~/service/runStat'
import { formatDate, formatLength, formatDuration } from '~/util/format'
import { primary, secondary, black, white } from '~/component/_abstract/palette'
import styled from 'preact-emotion'

export const UserRunList = ({
  userId,
  runs,
  loading,
  haveMore,
  loadMore,
  changeWeather,
  removeRun,
}) => (
  <Container>
    <List>
      {runs.map(run => (
        <Row key={run.id} href={`user/${userId}/run/${run.id}`}>
          <DateLabel>{formatDate(run.steps[0].date)}</DateLabel>
          <One>
            <Trace steps={run.steps} color={primary} />
          </One>
          <Two>
            <Length>
              <LengthValue>{formatLength(runLength(run.steps))}</LengthValue>
              <LengthLabel> km</LengthLabel>
            </Length>
          </Two>
          <Three>
            <Durantion>
              <DurantionLabel>in</DurantionLabel>
              <DurantionValue>
                {formatDuration(runDuration(run.steps))}
              </DurantionValue>
            </Durantion>
            <Velocity>
              {formatLength(
                runLength(run.steps) / runDuration(run.steps) * 1000 * 60 * 60
              )}{' '}
              km / h
            </Velocity>
          </Three>
          <Four
            onClick={e => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            <WeatherSwitch
              weather={run.weather}
              onChange={
                changeWeather && (value => changeWeather(run.id, value))
              }
              color={primary}
              iconStyle={{ width: '50px', height: '50px' }}
            />
          </Four>
          {removeRun && (
            <DeleteButton
              onClick={e => {
                removeRun(run.id)
                e.stopPropagation()
                e.preventDefault()
              }}
            >
              ×
            </DeleteButton>
          )}
        </Row>
      ))}
    </List>

    {!loading && runs.length === 0 && <Void>There is nothing here</Void>}

    <Footer>
      {haveMore && !loading && <button onClick={loadMore}>load more</button>}
      {loading && <Spinner color={primary} />}
    </Footer>
  </Container>
)

const Void = styled.div`
  color: ${black};
  width: 100%;
  text-align: center;
  padding: 60px 0;
`
const DeleteButton = styled.div`
  cursor: pointer;
  color: ${black};
  font-size: 20px;
  text-align: right;
  flex: 30px 0.2 1;
`

const Footer = styled.div`
  margin-top: 40px;
`
const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const Row = styled(Link)`
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  text-decoration: none;
  border-bottom: solid 1px rgba(255, 255, 255, 0.2);

  &:last-child {
    border-bottom-color: transparent;
  }
`
const Trace = styled(Trace_)`
  width: 90px;
  height: 90px;
`
const Four = styled.div`
  position: relative;
  padding-top: 30px;
`
const One = styled.div`
  position: relative;
`
const DateLabel = styled.div`
  position: absolute;
  bottom: 4px;
  left: 100px;
  font-size: 14px;
  color: ${secondary};
`
const Two = styled.div`
  flex-grow: 1;
  flex-basis: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Three = styled.div`
  flex-grow: 0.6;
  flex-basis: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
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

  position: relative;
  margin-right: 20px;
  box-shadow: 16px 13px 18px -8px rgba(0, 0, 0, 0.2);
`
const LengthValue = styled.span`
  font-size: 32px;
  font-weight: bold;
  color: ${primary};
`
const LengthLabel = styled.span`
  position: absolute;
  bottom: 4px;
  right: -24px;
  font-size: 16px;
  color: ${primary};
`

const Velocity = styled.div`
  color: ${white};
  position: absolute;
  top: 30px;
  right: 20px;
  font-size: 12px;
`

const Durantion = styled.div``
const DurantionValue = styled.span`
  color: ${white};
  font-size: 20px;
`
const DurantionLabel = styled.span`
  color: ${white};
  margin-right: 10px;
  font-size: 16px;
`
