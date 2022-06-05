import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import api from "../../services/api"
import AddBoxIcon from '@mui/icons-material/AddBox';
import Alert from '@mui/material/Alert';
import * as yup from "yup";
import { Snackbar } from '@mui/material';

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);

    const empresaID = localStorage.getItem("empresaID")
    const empresa = localStorage.getItem("empresaName")

    const [clientes, setClientes] = useState() // array do banco de dados
    const [produtos, setProdutos] = useState() // array do banco de dados

    const [snackOpen, setSnackOpen] = useState(false)
    const [cliente, setCliente] = useState()
    const [produto, setProduto] = useState()
    const [quantidadeProduto, setQuantidadeProduto] = useState()
    const [observacao, setObservacao] = useState()
    const [data, setData] = useState()

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const handleClickOpen = async () => {

        await api.post(`/clientes/${empresaID}/index`).then((clientes) => {
            setClientes(clientes.data)
        })

        await api.post(`/produtos/${empresaID}/index`).then((produtos) => {
            setProdutos(produtos.data)
        })

        setOpen(true);
    };


    const handleForm = async () => {
        if(!empresaID) return (setStatus({type:"error", message:"Crie e selecione uma empresa antes!"}))
        
        if (!(await validate())) return

        api.post(`/pedidos/${empresaID}/create`, {cliente, produto, quantidadeProduto, observacao, data, empresa}).then(() => {
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
            data: yup.string("Data obrigatória!").required("Data obrigatória!"),
            quantidadeProduto: yup.string("Quantidade de produto obrigatória!").required("Quantidade de produto obrigatória!"),
            produto: yup.string("Produto obrigatório!").required("Produto obrigatório!"),
            cliente: yup.string("Cliente obrigatório!").required("Cliente obrigatório!")
        })

        try {
            await schema.validate({ cliente, produto, quantidadeProduto, data})
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
                <h1>Adicionar Pedido</h1>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Adicionar Pedido (Empresa {empresa})</DialogTitle>
                {status.type === 'error' ? <Alert severity="error">{status.message}</Alert> : ""}
                <DialogContent>

                    <TextField
                        sx={{ mt: 1 }}
                        id="outlined-select-currency"
                        select
                        fullWidth
                        variant="standard"
                        label="Selecione um Cliente"
                        value={cliente}
                        onChange={(e) => { setCliente(e.target.value) }}
                    >
                        {clientes&&(clientes.map((val, key) => (
                            <MenuItem key={key} value={val.nome}>
                                {val.nome}
                            </MenuItem>
                        )))}
                    </TextField>


                    <TextField
                        sx={{ mt: 1 }}
                        id="outlined-select-currency"
                        select
                        fullWidth
                        variant="standard"
                        label="Selecione um Produto"
                        value={produto}
                        onChange={(e) => { setProduto(e.target.value) }}
                    >
                        {produtos &&(produtos.map((val, key) => (
                            <MenuItem key={key} value={val.nome}>
                                {val.nome}
                            </MenuItem>
                        )))}
                    </TextField>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="quantidade"
                        label="Quantidade do Produto"
                        name="quantidadeProduto"
                        type="text"
                        variant="standard"
                        value={quantidadeProduto} onChange={(e) => { setQuantidadeProduto(e.target.value) }}
                        fullWidth
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="observacao"
                        label="Observação"
                        multiline
                        maxRows={4}
                        name="observacao"
                        type="text"
                        variant="standard"
                        value={observacao} onChange={(e) => { setObservacao(e.target.value) }}
                        fullWidth
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="data"
                        label="Data para Entrega"
                        name="data"
                        type="text"
                        value={data} onChange={(e) => { setData(e.target.value) }}
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
