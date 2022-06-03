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
    const [descricao, setDescricao] = useState()
    const [empresa, setEmpresa] = useState()
    const [valor, setValor] = useState()


    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleForm = () => {
        api.post(`/produtos/${empresaID}/create`, {nome, descricao, empresa, valor}).then((response) => {
            console.log(response)
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
                <h1>Adicionar Produto</h1>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Adicionar Produto</DialogTitle>
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
                        id="descricao"
                        label="Descrição"
                        name="descricao"
                        type="text"
                        value={descricao} onChange={(e) => { setDescricao(e.target.value) }}
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

                    <TextField
                        autoFocus
                        margin="dense"
                        id="valor"
                        label="Valor"
                        name="valor"
                        type="text"
                        value={valor} onChange={(e) => { setValor(e.target.value) }}
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
