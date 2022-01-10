import {Table} from "semantic-ui-react";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";

const EquipReservationTable: React.FunctionComponent = (props) => {
    const router = useRouter();
    const selectedDate = router.query.selectedDate;
    const owner = router.query.owner;

    const [reservations, setReservation] = useState([])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API}/reservation-equip?owner=${owner}&date=${selectedDate}`).then((res) => {
            setReservation(res.data);
        })
    }, [selectedDate, owner])

    return (
        <>
            <Table compact>
                <Table.Header>
                    <Table.Row textAlign={"center"}>
                        <Table.HeaderCell>사용자</Table.HeaderCell>
                        <Table.HeaderCell>장비명</Table.HeaderCell>
                        <Table.HeaderCell>예약 기간</Table.HeaderCell>
                        <Table.HeaderCell>상태</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        reservations.length !== 0 ?
                            reservations.map(reservation => {

                            })
                            : (
                                <Table.Row>
                                    <Table.Cell />
                                    <Table.Cell textAlign={"center"}>등록된 예약이 없습니다!</Table.Cell>
                                    <Table.Cell />
                                    <Table.Cell />
                                </Table.Row>
                            )
                    }
                </Table.Body>
            </Table>
        </>
    )
}

export default EquipReservationTable