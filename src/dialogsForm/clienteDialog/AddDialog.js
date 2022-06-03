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

    const empresaID = localStorage.getItem("empresaID")

   const [nome, setNome] = useState()
   const  [email, setEmail] = useState()
   const [telefone, setTelefone] = useState()
   const  [empresa, setEmpresa] = useState()

    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleForm = () => {
        api.post(`/clientes/${empresaID}/create`, {nome, email, telefone, empresa}).then((cliente) => {
            console.log(cliente)
        })
        setOpen(false);
    };

    const handleClose = () => {

        setOpen(false)
    }

    return (
        <div>
            <div className="empresas-container-header" variant="outlined" onClick={handleClickOpen}>
                
                <AddBoxIcon sx={{ fontSize: 60 }} />
                <h1>Adicionar Cliente</h1>
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
                        id="telefone"
                        label="Telefone"
                        name="telefone"
                        type="text"
                        value={telefone} onChange={(e) => { setTelefone(e.target.value) }}
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
                        value={empresa} onChange={(e) => { setEmpresa(e.target.value) }}
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
