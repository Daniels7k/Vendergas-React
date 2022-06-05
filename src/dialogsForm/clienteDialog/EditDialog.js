import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import api from "../../services/api"
import Alert from '@mui/material/Alert';
import * as yup from "yup"
import { Snackbar } from '@mui/material';


export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [snackOpen, setSnackOpen] = useState(false)
   const [nome, setNome] = useState(props.nome)
   const  [email, setEmail] = useState(props.email)
   const [telefone, setTelefone] = useState(props.telefone)
   const  [empresa, setEmpresa] = useState(props.empresa)

   const [status, setStatus] = useState({
    type: '',
    message: ''
});

    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {

        setOpen(false)
        setStatus("")
        setSnackOpen(false)
    }

    const handleForm = async () => {
        if (!(await validate())) return

        api.put(`/clientes/${props.clienteID}/update`, {nome, email, telefone, empresa}).then(() => {
            setSnackOpen(true)
        })
        setOpen(false);
        setStatus("")
    };

    async function validate() {
        let schema = yup.object().shape({
    
            empresa: yup.string("Empresa obrigatória!").required("Empresa obrigatória!"),
            telefone: yup.string("Telefone obrigatório!").required("Telefone obrigatório!"),
            email: yup.string("Email obrigatório!").required("Email obrigatório!"),
            nome: yup.string("Nome obrigatório!").required("Nome obrigatório!")
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
            <div variant="outlined" onClick={handleClickOpen}>
                {props.edit}
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

            <Snackbar open={snackOpen} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%', marginRight: 4, marginTop: 1 }}>
                    Editado com sucesso!
                </Alert>
            </Snackbar>
        </div>
    );
}
