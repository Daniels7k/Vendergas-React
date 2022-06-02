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

    const [nomeFantasia, setNomeFantasia] = useState(props.nomeFantasia)
    const [razaoSocial, setRazaoSocial] = useState(props.razaoSocial)
    const [cnpj, setCnpj] = useState(props.cnpj)
    
    const handleClickOpen = () => {
        setOpen(true);

    };
    
    const handleClose = () => {
        setOpen(false);
        
        api.put(`empresas/${props.userID}/${props.empresaID}/update`,  {nomeFantasia, razaoSocial, cnpj} ).then((response) => {
            console.log(response)
        })
    };

    return (
        <div>
            <div variant="outlined" onClick={handleClickOpen}>
                    {props.name}
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Editar Empresa</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nomeFantasia"
                        label="Nome Fantasia"
                        name="nomeFantasia"
                        type="text"
                        defaultValue={props.nomeFantasia} onChange={(e) => { setNomeFantasia(e.target.value) }}
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
                        defaultValue={props.razaoSocial} onChange={(e) => { setRazaoSocial(e.target.value) }}
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
                        defaultValue={props.cnpj} onChange={(e) => { setCnpj(e.target.value) }}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleClose}>Salvar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
