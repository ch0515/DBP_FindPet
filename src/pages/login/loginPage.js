import "./loginPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
});
const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (event) =>{
    event.preventDefault();
    axios.post("http://localhost:3002/login", formData)
    .then((response) => {
      if(response.data.rows.length == 0){
        alert('아이디와 비밀번호가 틀림');
      }else{
        console.log("로그인 성공");
        sessionStorage.setItem("userData", JSON.stringify(response.data.rows[0]));
        navigate("/")
      }
    })
  
}
  return (
    <div>
      <div className="login-box">
        <div className="tab">
            <div className="login">로그인</div>
        </div>
        <form id="loginData" onSubmit={handleSubmit}>
          <div>아이디</div>
          <input type="text" name="id" className="id" value={formData.email} onChange={handleChange}/>
          <div>비밀번호</div>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="pw"/>
          <input className="loginbtn" type="submit" value="로그인"/>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;