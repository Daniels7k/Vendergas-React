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
import Alert from '@mui/material/Alert';
import * as yup from "yup";
import { Snackbar } from '@mui/material';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const empresaID = localStorage.getItem("empresaID")
    const [snackOpen, setSnackOpen] = useState(false)
    const [nome, setNome] = useState()
    const [descricao, setDescricao] = useState()
    const [empresa, setEmpresa] = useState()
    const [valor, setValor] = useState()

    
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleForm = async () => {
        if(!empresaID) return (setStatus({type:"error", message:"Crie e selecione uma empresa antes!"}))
        
        if (!(await validate())) return

        api.post(`/produtos/${empresaID}/create`, {nome, descricao, empresa, valor}).then(() => {
            setSnackOpen(true)
        })
        setOpen(false);
        setStatus("")
        setNome("")
        setDescricao("")
        setEmpresa("")
        setValor("")
    };

    const handleClose = () => {

        setOpen(false)
        setStatus("")
        setSnackOpen(false)
    }

    async function validate() {
        let schema = yup.object().shape({
            valor: yup.string("Valor obrigatório!").required("Valor obrigatório!"),
            empresa: yup.string("Empresa obrigatória!").required("Empresa obrigatória!"),
            descricao: yup.string("Descrição obrigatória!").required("Descrição obrigatória!"),
            nome: yup.string("Nome obrigatório!").required("Nome obrigatório!")
        })

        try {
            await schema.validate({ nome, descricao, empresa, valor})
            return true

        } catch (error) {

            setStatus({
                type: "error",
                message: error.errors
            })

            return false
        }
    }

    return (
        <div>
            <div className="empresas-container-header" variant="outlined" onClick={handleClickOpen}>
                <AddBoxIcon sx={{ fontSize: 60 }} />
                <h1>Adicionar Produto</h1>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Adicionar Produto</DialogTitle>
                {status.type === 'error' ? <Alert severity="error">{status.message}</Alert> : ""}
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

            <Snackbar open={snackOpen} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%', marginRight: 4, marginTop: 1 }}>
                    Cadastrado com sucesso!
                </Alert>
            </Snackbar>

        </div>
    );
}
