import React, {useEffect, useState} from "react";
import {Card, Grid, Image, Label, Loader} from "semantic-ui-react";
import {useRouter} from "next/router";
import Layout from "../../../../components/layout";
import axios from "axios";
import PlaceReservationTable from "../../../../components/equipment/place.reservation.table";
import {DateInput} from "semantic-ui-calendar-react";
import ReservationCalendar from "../../../../components/equipment/reservation.calendar";
import moment from "moment";

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

type placeType = {
    name: string,
    description: string,
    location: string,
    imageName: string
}

const handleDateChange = (e, data) => {
    try {

    } catch (error) {
        alert('조회 실패...')
    }
}

const RegionPlace: React.FunctionComponent = () => {
    const router = useRouter();
    const placeName = router.query.placeName as string;
    const [selectedDate, setDate] = useState(moment(new Date()).format('YYYYMMDD'))
    const [placeInfo, setPlaceInfo] = useState<placeType>();
    const [reservations, setReservations] = useState<reservationType[]>([]);
    const currentDate: Date = new Date();
    const currentDateTime: number = currentDate.getFullYear() * 10000 + (currentDate.getMonth() + 1) * 100 + currentDate.getDate();


    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API}/place/name/${placeName}`).then(res => {
            setPlaceInfo(res.data);
        })
        axios.get(`${process.env.NEXT_PUBLIC_API}/reservation-place/placeName/${placeName}/${currentDateTime}`).then(res => {
            setReservations(res.data);
        })
    }, [placeName, selectedDate])

    return (
        <Layout>
            <div>
                <Grid columns={2} divided stackable>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            {
                                placeInfo?
                                    <Card fluid>
                                        {
                                            (placeInfo && placeInfo.imageName) ?
                                                <Image src={`${process.env.NEXT_PUBLIC_API}/place/image/${placeInfo.imageName}`}
                                                       wrapped ui={false}/>
                                                : <Image src={"https://react.semantic-ui.com/images/wireframe/image.png"}
                                                         wrapped ui={false}/>
                                        }
                                        <Card.Content>
                                            <Card.Header>{placeInfo.name}</Card.Header>
                                            <Card.Meta>{placeInfo.location}</Card.Meta>
                                            <Card.Description>{placeInfo.description}</Card.Description>
                                        </Card.Content>
                                    </Card> : <Loader active/>
                            }
                        </Grid.Column>
                        <Grid.Column>
                            <Grid rows={2} divided stackable>
                                <Grid.Column>
                                    <Grid.Row centered style={{marginBottom: '1em'}}>
                                        <ReservationCalendar selectedDate={selectedDate}/>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <PlaceReservationTable reservations={reservations} />
                                    </Grid.Row>
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </Layout>
    )
}

export default RegionPlace