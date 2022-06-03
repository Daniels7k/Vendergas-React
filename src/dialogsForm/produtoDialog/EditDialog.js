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
    const [descricao, setDescricao] = useState(props.descricao)
    const [empresa, setEmpresa] = useState(props.empresa)
    const [valor, setValor] = useState(props.valor)


    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleForm = () => {
        api.put(`/produtos/${props.produtoID}/update`, {nome, descricao, empresa, valor}).then((response) => {
            console.log(response)
        })
        setOpen(false);
    };

    const handleClose = () => {

        setOpen(false)
    }

    return (
        <div>
            <div  variant="outlined" onClick={handleClickOpen}>
                    Editar
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
                        defaultValue={props.nome} onChange={(e) => { setNome(e.target.value) }}
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
                        defaultValue={props.descricao} onChange={(e) => { setDescricao(e.target.value) }}
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

                    <TextField
                        autoFocus
                        margin="dense"
                        id="valor"
                        label="Valor"
                        name="valor"
                        type="text"
                        defaultValue={props.valor} onChange={(e) => { setValor(e.target.value) }}
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
