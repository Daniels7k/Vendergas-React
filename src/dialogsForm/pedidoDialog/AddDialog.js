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

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);

    const empresaID = localStorage.getItem("empresaID")
    const empresa = localStorage.getItem("empresaName")

    const [clientes, setClientes] = useState() // array do banco de dados
    const [produtos, setProdutos] = useState() // array do banco de dados

    const [cliente, setCliente] = useState()
    const [produto, setProduto] = useState()
    const [quantidadeProduto, setQuantidadeProduto] = useState()
    const [observacao, setObservacao] = useState()
    const [data, setData] = useState()


    const handleClickOpen = async () => {

        await api.post(`/clientes/${empresaID}/index`).then((clientes) => {
            console.log(clientes)
            setClientes(clientes.data)
        })

        await api.post(`/produtos/${empresaID}/index`).then((produtos) => {
            console.log(produtos.data)
            setProdutos(produtos.data)
        })

        setOpen(true);
    };

    const handleForm = () => {
        api.post(`/pedidos/${empresaID}/create`, {cliente, produto, quantidadeProduto, observacao, data, empresa}).then((response) => {
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
                <h1>Adicionar Pedido</h1>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Adicionar Pedido (Empresa EDU Lanches)</DialogTitle>
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
        </div>
    );
}
