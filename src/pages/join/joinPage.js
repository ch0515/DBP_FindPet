import "./joinPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

const JoinPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      id: "",
      password: "",
      phoneNumber: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (event) =>{
  axios.post("http://localhost:3001/join", formData)
  .then((response) => {
    console.log("Signup successful:", response.data);
    alert('회원가입이 완료되었습니다.');
    navigate("/login");
  })
  .catch((error) => {
    console.error("Signup failed:", error);
  });
}
  return (
    <div>
      <div className="join-box">
        <div className="tab">
            <div className="join">회원가입</div>
        </div>
        <form id="loginData" >
          <div>아이디</div>
          <input type="text" name="id" className="id" value={formData.id} onChange={handleChange} />
          <div>비밀번호</div>
          <input type="text" name="password" className="pw" value={formData.password} onChange={handleChange}/>
          <div>전화번호</div>
          <input type="text" name="phoneNumber" className="phone-num" value={formData.phoneNumber} onChange={handleChange} />
          <input onClick={handleSubmit} className="join-btn" type="button" value="회원가입" />
        </form>
      </div>
    </div>
  );
};

export default JoinPage;