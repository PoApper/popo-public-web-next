import moment from "moment";

// dt: YYYMMDD
export function convertDate(dt: string) {
  return moment(dt, "YYYYMMDD").format("YYYY년 MM월 DD일")
}

// time: HHmm
export function convertTime(time: string) {
  return moment(time, "HHmm").format('HH:mm');
}

export function convertStatus(status: string) {
  switch (status) {
    case '통과':
      return 'green'
    case '거절':
      return 'red'
    default:
      return 'black'
  }
}
