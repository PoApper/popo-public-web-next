import {useState} from "react";
import axios from "axios";
import {Button, Modal} from "semantic-ui-react"

const DeleteConfirmModal = (props: any) => {
    const deleteTarget = props.target
    const deleteURI = props.deleteURI
    const [open, setOpen] = useState(props.open)

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API}/${deleteURI}`,
                { withCredentials: true })
            window.location.reload()
        } catch (e) {
            alert('장소 삭제에 실패했습니다.')
            console.log(e)
        }
    }

    return (
        <Modal
            open={open} trigger={props.trigger}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Modal.Header>삭제 확인</Modal.Header>
            <Modal.Content>
                <b>{deleteTarget}</b>이 삭제됩니다. 정말 삭제 하시겠습니까?
            </Modal.Content>
            <Modal.Actions>
                <Button content={'취소'} onClick={() => setOpen(false)}/>
                <Button negative icon={'check'} content={'삭제'} onClick={handleDelete}/>
            </Modal.Actions>
        </Modal>
    )
}

export default DeleteConfirmModal