import { ICalendar } from '@/types/calendar.interface';
import moment from 'moment';
import styled from 'styled-components';

const CalendarPanel = ({ nextEvent }: { nextEvent: ICalendar }) => {
  const dDay = moment(nextEvent.event_date).diff(moment(), 'days');
  return (
    <div style={{ marginBottom: 12 }}>
      <NoticeCard>
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
          <br />(
          {`${moment(nextEvent.event_date).format('M월 D일')}`}
          )
        </div>
      </NoticeCard>
    </div>
  );
};

export default CalendarPanel;

const NoticeCard = styled.div`
  background: #eeeeee;
  border-radius: 0.4em;
  padding: 18px;
  text-align: center;
`;
