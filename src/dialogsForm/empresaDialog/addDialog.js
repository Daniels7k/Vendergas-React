import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import api from "../../services/api"
import * as yup from "yup"
import AddBoxIcon from '@mui/icons-material/AddBox';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

export default function FormDialog(props) {

    //HOOKS
    const [open, setOpen] = React.useState(false);
    const [snackOpen, setSnackOpen] = useState(false)
    const [nomeFantasia, setNomeFantasia] = useState()
    const [razaoSocial, setRazaoSocial] = useState()
    const [cnpj, setCnpj] = useState()

    //HOOK ALERT
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    //FUNÇÕES

    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleForm = async () => {

        if (!(await validate())) return

        setOpen(false);
        api.post(`/empresas/${props.userID}/create`, { nomeFantasia, razaoSocial, cnpj }).then(() => {
            setSnackOpen(true)
        })
    };

    const handleClose = () => {

        setOpen(false)
        setSnackOpen(false)
    }

    //YUP

    async function validate() {
        let schema = yup.object().shape({
            cnpj: yup.string("CNPJ obrigatório!").required("CNPJ obrigatório!"),
            razaoSocial: yup.string("Razão social obrigatória!").required("Razão social obrigatória!"),
            nomeFantasia: yup.string("Nome fantasia obrigatório!").required("Nome fantasia obrigatório!")
        })

        try {
            await schema.validate({ nomeFantasia, razaoSocial, cnpj })
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
                <h1>Adicionar Empresa</h1>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Adicionar Empresa</DialogTitle>
                {status.type === 'error' ? <Alert severity="error">{status.message}</Alert> : ""}
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nomeFantasia"
                        label="Nome Fantasia"
                        name="nomeFantasia"
                        type="text"
                        value={nomeFantasia} onChange={(e) => { setNomeFantasia(e.target.value) }}
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
                        value={razaoSocial} onChange={(e) => { setRazaoSocial(e.target.value) }}
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
                        value={cnpj} onChange={(e) => { setCnpj(e.target.value) }}
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
