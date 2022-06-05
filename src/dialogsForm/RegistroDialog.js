import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import api from ".././services/api"
import Alert from '@mui/material/Alert';
import * as yup from "yup"
import { Snackbar } from '@mui/material';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const [snackOpen, setSnackOpen] = useState(false)

    const [nome, setNome] = useState()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleForm = async () => {
        if (!(await validate())) return

        api.post("/usuarios/registro", { nome, email, senha }).then((response) => {
            console.log(response.data)
            setSnackOpen(true)
        })
        setOpen(false);
        

    };

    const handleClose = () => {

        setOpen(false)
        setSnackOpen(false)
        setStatus("")

    }

    async function validate() {
        let schema = yup.object().shape({
            senha: yup.string("Senha obrigatória!").required("Senha obrigatória!"),
            email: yup.string("Email obrigatório!").required("Email obrigatório!"),
            nome: yup.string("Nome obrigatório!").required("Nome obrigatório!")
        })
        try {
            await schema.validate({ nome, email, senha })
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
            <Button variant="outlined" onClick={handleClickOpen}>
                Registrar
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Registro</DialogTitle>
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
                        id="senha"
                        label="Senha"
                        name="senha"
                        type="password"
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

            <Snackbar open={snackOpen} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Cadastrado com sucesso!
                </Alert>
            </Snackbar>

        </div>
    );
}
