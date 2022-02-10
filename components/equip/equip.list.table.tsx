import {Image, Modal, Table} from "semantic-ui-react";

type equipmentType = {
    name: string,
    description: string,
    fee: number,
    imageName: string
};

const EquipListTable: React.FunctionComponent<{ equipments: equipmentType[] }> = (props) => {
    return (
        <Table >
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={1}>#</Table.HeaderCell>
                    <Table.HeaderCell width={8}>장비 이름</Table.HeaderCell>
                    <Table.HeaderCell width={2}>예약비</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    props.equipments.map((equipment: any, idx: number) =>
                        <Modal trigger={
                            <Table.Row>
                                <Table.Cell>{idx+1}</Table.Cell>
                                <Table.Cell>{equipment.name}</Table.Cell>
                                <Table.Cell>{equipment.fee.toLocaleString()}</Table.Cell>
                            </Table.Row>
                        }
                        >
                            <Modal.Content>
                                <Image src={equipment.imageName ?
                                    `${process.env.NEXT_PUBLIC_API}/equip/image/${equipment.imageName}`
                                    :'https://via.placeholder.com/200?text=NoImage'}/>
                            </Modal.Content>
                        </Modal>

                    )
                }
            </Table.Body>
        </Table>
    )
}

export default EquipListTable