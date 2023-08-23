import { Link } from "react-router-dom";
import React, {useState, useEffect} from "react";
import './Navbar.css';
import mainlogo from '../img/logo.png';
const userData = JSON.parse(sessionStorage.getItem("userData"));

function Navbar(){
    const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userData");
    setUserData(null);
  };
    return(
        <div>
            <div className="navbar">
                <div className="logostyle">
                    <h1 className="logo">Find Pet</h1>
                    <img className="logoimage" src={mainlogo}/>
                </div>
                <div className="Menu">
                {userData ? ( // 로그인 정보가 있을 경우
            <>
              <Link className="navbarMenu" to={'/profile'}>내 정보</Link>
              <Link className="navbarMenu" to={'/logout'}>로그아웃</Link>
            </>
          ) : ( // 로그인 정보가 없을 경우
            <>
              <Link className="navbarMenu" to={'/join'}>회원가입</Link>
              <Link className="navbarMenu" to={'/login'}>로그인</Link>
            </>
          )}
                </div>
            </div>
        </div>
    )
}

export default Navbar;