import moment from "moment";

// dt: YYYMMDD
export function convertDate(dt) {
  return moment(dt, "YYYYMMDD").format("YYYY년 MM월 DD일")
}

// time: HHmm
export function convertTime(time) {
  return moment(time, "HHmm").format('HH:mm');
}

export function convertStatus(status) {
  switch (status) {
    case '통과':
      return 'green'
    case '거절':
      return 'red'
    default:
      return 'black'
  }
}

export function convertDateTime(numberedDate, numberTime) {
  const year = parseInt(numberedDate / 10000);
  const month = parseInt((numberedDate % 10000) / 100);
  const day = numberedDate % 100;
  const date = new Date().setFullYear(year, month - 1, day);
  const hour = parseInt(numberTime / 100);
  const minute = numberTime % 100;
  return new Date(date).setHours(hour, minute);
}