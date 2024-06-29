
import React from 'react';

import Layout from '@/components/layout';
import { Table } from 'semantic-ui-react';


const TheCampusShuttleBusOperatingSchedule: React.FC = () => {
    const InnerSpotList = ['임시 주차장', '지곡회관', '철강대학원', '실험동', '가속기', '실험동', '철강대학원', '지곡회관', '임시 주차장']
    const InnerSpotTable = [
        ['09:20', '09:21', '09:23', '09:29', '09:30', '09:31', '09:35', '09:37', '09:40'],
        ['10:20', '10:21', '10:23', '10:29', '10:30', '10:31', '10:35', '10:37', '10:40'],
        ['11:20', '11:21', '11:23', '11:29', '11:30', '11:31', '11:35', '11:37', '11:40'],
        ['13:20', '13:21', '13:23', '13:29', '13:30', '13:31', '13:35', '13:37', '13:40'],
        ['14:20', '14:21', '14:23', '14:29', '14:30', '14:31', '14:35', '14:37', '14:40'],
        ['15:20', '15:21', '15:23', '15:29', '15:30', '15:31', '15:35', '15:37', '15:40'],
        ['16:20', '16:21', '16:23', '16:29', '16:30', '16:31', '16:35', '16:37', '16:40'],
        ['17:20', '17:21', '17:23', '17:29', '17:30', '17:31', '17:35', '17:37', '17:40'],
    ]

    return (
        <Layout>
            <h1>🚌 교내 셔틀버스 운행시간 안내 (방학 중)</h1>

            <h2>교수 아파트(Faculty Apartment Area)</h2>
            <Table textAlign="center" compact celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>오전(AM)</Table.HeaderCell>
                        <Table.HeaderCell width={1}>교수 8동</Table.HeaderCell>
                        <Table.HeaderCell width={1}>교수 5동</Table.HeaderCell>
                        <Table.HeaderCell width={1}>임시주차장</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell></Table.Cell>
                        <Table.Cell>08:45</Table.Cell>
                        <Table.Cell>08:46</Table.Cell>
                        <Table.Cell>08:50</Table.Cell>
                    </Table.Row>
                </Table.Body>

                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>오후(PM)</Table.HeaderCell>
                        <Table.HeaderCell>임시주차장</Table.HeaderCell>
                        <Table.HeaderCell>교수 5동</Table.HeaderCell>
                        <Table.HeaderCell>교수 8동</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell></Table.Cell>
                        <Table.Cell>18:00</Table.Cell>
                        <Table.Cell>18:04</Table.Cell>
                        <Table.Cell>18:05</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>

            <h2>교내 셔틀(POSTECH Campus Area)</h2>
            <Table textAlign="center" compact celled>
                <Table.Header>
                    <Table.Row>
                        {
                            InnerSpotList.map((spot, index) => {
                                return (
                                    <Table.HeaderCell width={1} key={index}>
                                        {spot}
                                    </Table.HeaderCell>
                                )
                            })
                        }
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        InnerSpotTable.map((time_list, index) => {
                            return (
                                <Table.Row key={index}>
                                    {
                                        time_list.map((_time, i) => {
                                            return (
                                                <Table.Cell key={i}>{_time}</Table.Cell>
                                            )
                                        })
                                    }
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            </Table>

            <p>
                * 주중(월~금)에만 운행 (Shuttle bus operates only on weekdays)<br/>
                단, 휴일 및 주말에는 차량 운행 없음. (There's no campus shuttle bus support on holidays and weekends)
            </p>
            <p>
                - 방학중 운행 기간: 2024.06.10(월) ~ 2024.08.30(금)<br/>
                - 시행일자: 2024.06.10(월)<br/>
                - 문의처: 054-279-3536 (차량반)<br/>
            </p>
        </Layout>
    );
};

export default TheCampusShuttleBusOperatingSchedule;