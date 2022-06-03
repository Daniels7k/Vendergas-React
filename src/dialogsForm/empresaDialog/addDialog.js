import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import api from "../../services/api"
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [nomeFantasia, setNomeFantasia] = useState()
    const [razaoSocial, setRazaoSocial] = useState()
    const [cnpj, setCnpj] = useState()

    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleForm = () => {
        setOpen(false);
        api.post(`/empresas/${props.userID}/create`, { nomeFantasia, razaoSocial, cnpj }).then((response) => {
            console.log(response)
        })
    };

    const handleClose = () => {

        setOpen(false)
    }

    return (
        <div>
            <div className="empresas-container-header" variant="outlined" onClick={handleClickOpen}>
                <AddBoxIcon sx={{ fontSize: 60 }} />
                <h1>Adicionar Empresa</h1>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Adicionar Empresa</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nomeFantasia"
                        label="Nome Fantasia"
                        name="nomeFantasia"
                        type="text"
                        value={nomeFantasia} onChange={(e) => { setNomeFantasia(e.target.value) }}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="razaoSocial"
                        label="Razão Social"
                        name="razaoSocial"
                        type="text"
                        value={razaoSocial} onChange={(e) => { setRazaoSocial(e.target.value) }}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="cnpj"
                        id="cnpj"
                        label="CNPJ"
                        type="text"
                        value={cnpj} onChange={(e) => { setCnpj(e.target.value) }}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleForm}>Adicionar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
