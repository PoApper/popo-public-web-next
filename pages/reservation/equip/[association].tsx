import {useEffect, useState} from "react";
import axios from "axios";
import * as moment from "moment";


const ownerName = {
    'dongyeon': '동아리연합회',
    'dormUnion': '생활관자치회',
    'saengna': '생각나눔',
}

const ownerLocation = {
    'dongyeon': '동아리연합회 사무실(학생회관 301호)',
    'dormUnion': '생활관자치회 사무실(생활관 4동)',
    'saengna': '생각나눔 사무실(학생회관 108호)',
}


const EquipAssociation = (props: any) => {
    console.log(props)
    const association = props.match.params.association
    const [selectedDate, setDate] = useState((new Date()))
    const [userInfo, setUserInfo] = useState()
    const [equipments, setEquipments] = useState([])

    useEffect(() => {
        const res1 = async () => {
            await axios.get(`${process.env.NEXT_PUBLIC_API}/auth/verifyToken`,
                { withCredentials: true }).then(res => setUserInfo(res.data)).catch(() => {})
        }
        const res2 = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/equip/owner/${association}`)
            setEquipments(response.data)
        }
    }, [selectedDate, association])

    return (
        <div>
            <h1>장비 예약하기</h1>
        </div>
    )
}

export default EquipAssociation