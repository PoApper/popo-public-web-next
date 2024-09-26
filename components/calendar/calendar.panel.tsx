import moment from 'moment';
import 'moment/locale/ko';
import styled from 'styled-components';

import { ICalendar } from '@/types/calendar.interface';

const CalendarPanel = ({ nextEvent }: { nextEvent: ICalendar }) => {
  const dDay = moment(nextEvent.event_date).diff(
    moment().format('YYYY-MM-DD'),
    'days',
  );
  return (
    <div style={{ marginBottom: 12 }}>
      <CalendarCard>
        <div
          style={{
            fontWeight: 700,
            fontSize: 36,
            textDecoration: 'none',
            marginBottom: 12,
          }}
        >
          {dDay ? `D-${dDay}` : 'D-Day'}
        </div>
        <div>
          {nextEvent.title}
          <br />({`${moment(nextEvent.event_date).format('MM월 DD일 dddd')}`})
        </div>
      </CalendarCard>
    </div>
  );
};

export default CalendarPanel;

const CalendarCard = styled.div`
  background: #eeeeee;
  border-radius: 0.4em;
  padding: 18px;
  text-align: center;
`;
