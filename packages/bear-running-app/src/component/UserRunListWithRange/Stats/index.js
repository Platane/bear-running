import { h, Component } from 'preact'
import { primary, secondary, black, white } from '~/component/_abstract/palette'
import { Spinner } from '~/component/Spinner'
import { runLength, runDuration } from '~/service/runStat'
import { formatDate, formatLength, formatDuration } from '~/util/format'
import styled from 'preact-emotion'

const length = runs =>
  runs.reduce((sum, { steps }) => sum + runLength(steps), 0)

const duration = runs =>
  runs.reduce((sum, { steps }) => sum + runDuration(steps), 0)

export const Stats = ({ start, end, runs, haveMore }) => (
  <Container>
    <L>in </L>
    <B>{`${Math.ceil((end - start) / 1000 / 60 / 60 / 24)} days`}</B>
    <L>, </L>
    <L>{haveMore ? 'more than ' : ''}</L>
    <B>{`${formatLength(length(runs))} km`}</B>
    <L> ran, in a total of </L>
    <L>{haveMore ? 'more than ' : ''}</L>
    <B>{`${formatDuration(duration(runs))}`}</B>
  </Container>
)

const L = styled.span`
  color: ${black};
`
const B = styled.span`
  font-weight: bold;
  color: ${white};
`
const Container = styled.div`
  width: 100%;
  padding: 20px 0;
`
