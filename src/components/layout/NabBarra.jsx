import React from "react";
import { Link } from "react-router-dom";

export default function NavBarra(){
    return(
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/cadastro">Cadastro</Link></li>
            </ul>
        </nav>
    )
}