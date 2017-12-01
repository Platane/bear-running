import { h, Component } from 'preact'
import { UserRunList } from '~/component/UserRunList/Dumb'
import { InputDateRange } from '~/component/InputDateRange'
import { primary, secondary, black, white } from '~/component/_abstract/palette'
import { formatDate } from '~/util/format'
import styled from 'preact-emotion'

export const UserRunListWithRange = ({
  end,
  start,
  min,
  max,
  runs,
  loading,
  haveMore,
  loadMore,
  onRangeChange,
  onToggleSorting,
  sortingDescending,
  changeWeather,
  removeRun,
}) => (
  <Container>
    <Filter>
      <Section>
        <Label>{`Filter by date: ${formatDate(start)} - ${formatDate(
          end
        )}`}</Label>
        <InputDateRange
          min={min}
          max={max}
          style={{ width: '100%' }}
          onSubmit={onRangeChange}
        />
      </Section>
      <Section>
        <Label>
          Order by:
          <LabelValue onClick={onToggleSorting}>
            date {sortingDescending ? 'descending' : 'ascending'}
          </LabelValue>
        </Label>
      </Section>
    </Filter>
    <UserRunList
      runs={runs}
      loading={loading}
      haveMore={haveMore}
      loadMore={loadMore}
      removeRun={removeRun}
      changeWeather={changeWeather}
    />
  </Container>
)

const Label = styled.div`
  color: ${black};
`
const Filter = styled.div`
  padding: 10px;
  overflow: hidden;
`
const Section = styled.div`
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0px;
  }
`

const LabelValue = styled.span`
  font-weight: bold;
  color: ${primary};
  margin-left: 10px;
  cursor: pointer;
`
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
