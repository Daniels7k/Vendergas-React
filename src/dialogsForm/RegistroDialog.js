import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import api from ".././services/api"

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const [nome, setNome] = useState()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()


    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleForm = () => {
        api.post("/usuarios/registro", {nome, email, senha}).then((response) => {
            console.log(response.data)
        })
        setOpen(false);
    };

    const handleClose = () => {

        setOpen(false)
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Registrar
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Registro</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="nome"
                        label="Nome"
                        name="nome"
                        type="text"
                        value={nome} onChange={(e) => { setNome(e.target.value) }}
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
                        value={email} onChange={(e) => { setEmail(e.target.value) }}
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="senha"
                        label="Senha"
                        name="senha"
                        type="text"
                        value={senha} onChange={(e) => { setSenha(e.target.value) }}
                        fullWidth
                        variant="standard"
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleForm}>Registrar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
