import "./joinPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const JoinPage = () => {
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
      <div className="join-box">
        <div className="tab">
            <div className="join">회원가입</div>
        </div>
        <form id="loginData" >
          <div>아이디</div>
          <input type="text" name="id" className="id" value={formData.id} onChange={handleChange} />
          <div>비밀번호</div>
          <input type="text" name="password" className="pw" value={formData.password} onChange={handleChange}/>
          <input onClick={handleSubmit} className="join-btn" type="button" value="회원가입" />
        </form>
      </div>
    </div>
  );
};

export default JoinPage;