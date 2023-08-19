import { Link } from "react-router-dom";
import React from "react";
import './Navbar.css';
import mainlogo from '../img/logo.png';

function Navbar(){
    return(
        <div>
            <div className="navbar">
                <div className="logostyle">
                    <h1 className="logo">Find Pet</h1>
                    <img className="logoimage" src={mainlogo}/>
                </div>
                <div className="Menu">
                <Link className="navbarMenu" to={'/join'}>회원가입</Link>
                <Link className="navbarMenu" to={'/login'}>로그인</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;