import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import api from "../../services/api"


export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);

   const [nome, setNome] = useState(props.nome)
   const  [email, setEmail] = useState(props.email)
   const [telefone, setTelefone] = useState(props.telefone)
   const  [empresa, setEmpresa] = useState(props.empresa)

    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {

        setOpen(false)
    }

    const handleForm = () => {
        api.put(`/clientes/${props.clienteID}/update`, {nome, email, telefone, empresa}).then((cliente) => {
            console.log(cliente)
        })
        setOpen(false);
    };

    return (
        <div>
            <div variant="outlined" onClick={handleClickOpen}>
                {props.edit}
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Adicionar Cliente</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nome"
                        label="Nome"
                        name="nome"
                        type="text"
                        defaultValue={props.nome} onChange={(e) => { setNome(e.target.value) }}
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email"
                        name="email"
                        type="text"
                        defaultValue={props.email} onChange={(e) => { setEmail(e.target.value) }}
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="telefone"
                        label="Telefone"
                        name="telefone"
                        type="text"
                        defaultValue={props.telefone} onChange={(e) => { setTelefone(e.target.value) }}
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="empresa"
                        label="Empresa"
                        name="empresa"
                        type="text"
                        defaultValue={props.empresa} onChange={(e) => { setEmpresa(e.target.value) }}
                        fullWidth
                        variant="standard"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleForm}>Editar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
