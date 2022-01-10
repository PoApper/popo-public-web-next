import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import {DateInput} from "semantic-ui-calendar-react";
import {Label} from "semantic-ui-react";

const EquipReservationCalendar: React.FunctionComponent = (props) => {
    const router = useRouter();
    const selectedDate = router.query.selectedDate as string;
    const owner = router.query.owner;
    const [reservations, setReservations] = useState([]);

    // useEffect(() => {
    //     axios.get( `${process.env.NEXT_PUBLIC_API}/reservation-equip?owner=${owner}`).then(res => {
    //         setReservations(res.data);
    //     }, [selectedDate, owner])
    // })

    return (
        <>
            <DateInput
                inline
                name={"date"}
                dateFormat={"YYYYMMDD"}
                onChange={(e, data) => {
                e.preventDefault()

            }} value={selectedDate} />
            <p>날짜를 고르면, 예약 현황을 확인할 수 있습니다! 😎</p>
            <p>해당 날짜에 예약이 하나라도 존재하면, 달력에 <Label circular color={"orange"} empty/>로 표시됩니다.</p>
            <p>
                <b>심사중</b>은 <Label circular color={"black"} empty/> 로, &nbsp;
                <b>통과</b>는 <Label circular color={"green"} empty/> 로, &nbsp;
                <b>거절</b>은 <Label circular color={"red"} empty/> 로 표시됩니다.
            </p>
        </>
    );
}

export default EquipReservationCalendar