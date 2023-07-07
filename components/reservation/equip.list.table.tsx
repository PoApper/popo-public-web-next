import { useEffect, useState } from 'react'
import { Image, Modal, Table } from 'semantic-ui-react'

import { IEquipment } from '@/types/reservation.interface'
import { PoPoAxios } from '@/lib/axios.instance'

type EquipListTableProps = {
  associationName: string
}

const EquipListTable = ({ associationName }: EquipListTableProps) => {
  const [equipments, setEquipments] = useState<IEquipment[]>([])

  useEffect(() => {
    if (!associationName) return;

    PoPoAxios.get(`/equip/owner/${associationName}`).
      then((res) => setEquipments(res.data))
  }, [associationName])

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={1}>#</Table.HeaderCell>
          <Table.HeaderCell width={8}>장비 이름</Table.HeaderCell>
          <Table.HeaderCell width={2}>예약비</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          equipments.map((equipment: any, idx: number) =>
            <Modal
              key={idx}
              size={'mini'}
              trigger={
                <Table.Row>
                  <Table.Cell>{idx + 1}</Table.Cell>
                  <Table.Cell>{equipment.name}</Table.Cell>
                  <Table.Cell>{equipment.fee.toLocaleString()}</Table.Cell>
                </Table.Row>
              }>
              <Modal.Content>
                <Image src={equipment.image_url ?? 'https://via.placeholder.com/200?text=NoImage'}
                  alt={`${equipment.name}_logo`}/>
                  <pre style={{whiteSpace: "pre-wrap"}}>
                    {equipment.description}
                  </pre>
              </Modal.Content>
            </Modal>,
          )
        }
      </Table.Body>
    </Table>
  )
}

export default EquipListTable