import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

//import Login from '../pages/Login'
import Cadastro from '../pages/cadastro/Cadastro';
import UserCadastro from '../pages/userCadastro/UserCadastro';
//import NavBarra from '../components/layout/NabBarra';

export default function AppRoutes(){
    console.log("Rotas renderizadas"); // Adicione isso
    return(
        <Router>  
            <Routes>
                <Route path='/' element={<Cadastro />} />
                <Route path='/userCadastro' element={<UserCadastro />} />
            </Routes>
        </Router>
    )
}

