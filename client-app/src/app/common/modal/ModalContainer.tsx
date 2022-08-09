import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../stores/store";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default observer(function ModalContainer() {
    const {modalStore: {modal:{open, body}, closeModal}} = useStore()
    return (
        <Modal
            open={open}
            onClose={closeModal}
        >
            <Box sx={style}>
                {body}
            </Box>
        </Modal>
    )
})