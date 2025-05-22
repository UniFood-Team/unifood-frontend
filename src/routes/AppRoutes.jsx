import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

//import Login from '../pages/Login'
import UserBemVindo from '../pages/userBemVindo/UserBemVindo';
import ClienteCadastro from '../pages/cliente/clienteCadastro/ClienteCadastro';
import VendedorCadastro from '../pages/vendedor/vendedorCadastro/VendedorCadastro'
import MeusProdutos from '../pages/vendedor/meusProdutos/MeusProdutos';

export default function AppRoutes(){
    console.log("Rotas renderizadas"); // Adicione isso
    return(
        <Router>  
            <Routes>
                <Route path='/' element={<UserBemVindo />} />
                <Route path='/clienteCadastro' element={<ClienteCadastro />} />
                <Route path='/vendedorCadastro' element={<VendedorCadastro />} />
                <Route path='/meusprodutos' element={<MeusProdutos/>}/>
            </Routes>
        </Router>
    )
}

