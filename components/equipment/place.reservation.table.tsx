import {Table} from "semantic-ui-react";
import {convertDate, convertTime} from "../../lib/time-date";

type bookerType = {
    name: string,
    userType: string
}

type reservationType = {
    booker: bookerType,
    date: string,
    description: string,
    start_time: string,
    end_time: string,
    phone: string,
    status: string,
    title: string
}

const PlaceReservationTable: React.FunctionComponent<{reservations: reservationType[]}> = (props) => {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>사용자</Table.HeaderCell>
                    <Table.HeaderCell>예약 제목</Table.HeaderCell>
                    <Table.HeaderCell>예약 기간</Table.HeaderCell>
                    <Table.HeaderCell>상태</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    props.reservations.length !== 0 ?
                        props.reservations.map((reservation) => {
                            return <Table.Row>
                                <Table.Cell>{reservation.booker.name}</Table.Cell>
                                <Table.Cell>{reservation.title}</Table.Cell>
                                <Table.Cell>
                                    {convertDate(reservation.date)}<br />
                                    {convertTime(reservation.start_time)} ~ {convertTime(reservation.end_time)}
                                </Table.Cell>
                            </Table.Row>
                        })
                        : <Table.Row>
                            <Table.Cell />
                            <Table.Cell>등록된 예약이 없습니다!</Table.Cell>
                            <Table.Cell />
                            <Table.Cell />
                        </Table.Row>
                }
            </Table.Body>
        </Table>
    )
}

export default PlaceReservationTable