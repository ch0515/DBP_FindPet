import "./loginPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
          <input type="text" name="password" value={formData.password} onChange={handleChange} className="pw"/>
          <input className="loginbtn" type="submit" value="로그인"/>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;