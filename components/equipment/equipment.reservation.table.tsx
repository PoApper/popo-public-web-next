import {Table} from "semantic-ui-react";

const EquipmentReservationTable = (props: any) => {
    const reservations = props.reservations
    const start_idx = props.startIdx

    return (
        <>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>idx.</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
            </Table>
        </>
    )
}

export default EquipmentReservationTable