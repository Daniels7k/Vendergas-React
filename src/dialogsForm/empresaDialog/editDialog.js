import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from "yup"
import { Alert } from '@mui/material';
import api from "../../services/api";
import { Snackbar } from '@mui/material';



export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [snackOpen, setSnackOpen] = useState(false)
    const [nomeFantasia, setNomeFantasia] = useState(props.nomeFantasia)
    const [razaoSocial, setRazaoSocial] = useState(props.razaoSocial)
    const [cnpj, setCnpj] = useState(props.cnpj)
    

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const handleClickOpen = () => {
        setOpen(true);

    };
    
    const handleForm = async () => {
        if (!(await validate())) return
       
        api.put(`empresas/${props.userID}/${props.empresaID}/update`,  {nomeFantasia, razaoSocial, cnpj} ).then(() => {
            setSnackOpen(true)
        })
        setOpen(false);
        setStatus("")
    };

    const handleClose = () => {
        setStatus("")
        setOpen(false)
        setSnackOpen(false)
    }

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
            <div variant="outlined" onClick={handleClickOpen}>
                    {props.name}
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Editar Empresa</DialogTitle>
                {status.type === 'error' ? <Alert severity="error">{status.message}</Alert> : ""}
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
                    <Button onClick={handleForm}>Salvar</Button>
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
