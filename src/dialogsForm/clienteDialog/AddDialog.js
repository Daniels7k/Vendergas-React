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

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);

    const empresaID = localStorage.getItem("empresaID")

    const [snackOpen, setSnackOpen] = useState(false)
    const [nome, setNome] = useState()
    const [email, setEmail] = useState()
    const [telefone, setTelefone] = useState()
    const [empresa, setEmpresa] = useState()

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
        api.post(`/clientes/${empresaID}/create`, { nome, email, telefone, empresa }).then(() => {
            setSnackOpen(true)
        })
        setOpen(false);
        setStatus("")
    };

    const handleClose = () => {
        setOpen(false)
        setStatus("")
        setSnackOpen(false)
    }

    async function validate() {
        let schema = yup.object().shape({

            empresa: yup.string("Empresa obrigatória!").required("Empresa obrigatória!"),
            telefone: yup.string("Telefone obrigatório!").required("Telefone obrigatório!"),
            email: yup.string("Email obrigatório!").required("Email obrigatório!"),
            nome: yup.string("Nome obrigatório!").required("Nome obrigatório!"),
        })

        try {
            await schema.validate({ nome, email, telefone, empresa })
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
                <h1>Adicionar Cliente</h1>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Adicionar Cliente</DialogTitle>
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

            <Snackbar open={snackOpen} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%', marginRight: 4, marginTop: 1 }}>
                    Cadastrado com sucesso!
                </Alert>
            </Snackbar>
        </div>
    );
}
