import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

//import Login from '../pages/Login'
import Cadastro from '../pages/cadastro/Cadastro';
//import NavBarra from '../components/layout/NabBarra';

export default function Rotas(){
    console.log("Rotas renderizadas"); // Adicione isso
    return(
        <Router>  
            <Routes>
                <Route path='/' element={<Cadastro />} />
                </Routes>
        </Router>
    )
}

