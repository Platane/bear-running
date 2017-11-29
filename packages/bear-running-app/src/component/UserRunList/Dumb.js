import { h, Component } from 'preact'
import { Trace as Trace_ } from '~/component/Trace'
import { Link } from '~/component/Link'
import { runLength, runDuration } from '~/service/runStat'
import { formatDate, formatLength, formatDuration } from '~/util/format'
import { primary, black, grey, white } from '~/component/_abstract/palette'
import styled from 'preact-emotion'

export const UserRunList = ({ runs, haveMore, loadMore }) => (
  <Container>
    {runs.map(run => (
      <Row key={run.id}>
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
        </Three>
      </Row>
    ))}
    {haveMore && <button onClick={loadMore}>load more</button>}
  </Container>
)

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const Row = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: row;
  align-items: center;

  border-bottom: solid 1px rgba(255, 255, 255, 0.2);

  &:last-child {
    border-bottom-color: transparent;
  }
`
const Trace = styled(Trace_)`
  width: 90px;
  height: 90px;
`
const One = styled.div`
  margin-right: 50px;
`
const Two = styled.div``
const Three = styled.div`
  margin-left: auto;
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
