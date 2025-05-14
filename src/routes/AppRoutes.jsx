import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Welcome from "../pages/WelcomePage/Welcome"

export default function Rotas(){
    console.log("Rotas renderizadas"); // Adicione isso
    return(
        <Router>  
            <Routes>
                <Route path='/' element={<Welcome />} />
                </Routes>
        </Router>
    )
}

