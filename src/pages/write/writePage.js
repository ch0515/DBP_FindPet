import React, { useState } from 'react';
import {DaumPostcode, useDaumPostcodePopup} from 'react-daum-postcode';
import './writePage.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Post from '../../components/Popuppost';

const WritePage = () => {
  const navigate = useNavigate();
    const [popup, setPopup] = React.useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // 추가된 부분
    
    const [formData, setFormData] = useState({
      animalType: "",
      phoneNumber: "",
      address: "",
      photoFile: null,
      memo: "",
    });
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    const setAddress = (newAddress) => {
      setFormData((prevData) => ({
        ...prevData,
        address: newAddress,
      }));
    };
    const handleSubmit = (event) => {
      event.preventDefault();

  const formDataToSend = new FormData();
  formDataToSend.append('animalType', formData.animalType);
  formDataToSend.append('phoneNumber', formData.phoneNumber);
  formDataToSend.append('address', formData.address);
  formDataToSend.append('photoFile', formData.photoFile);
  formDataToSend.append('memo', formData.memo);

  axios.post("http://localhost:3002/write", formDataToSend, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then((response) => {
    console.log('서버 응답 : ', response.data);
    alert("글 작성 완료");
    navigate("/");
  }).catch(error => {
    console.log('폼 제출 에러 : ', error);
    alert("글 작성 실패");
  });
    };
  
    const [previewImage, setPreviewImage] = useState(null);

const handlePhotoChange = async (event) => {
  const selectedFile = event.target.files[0];
  const arrayBuffer = await selectedFile.arrayBuffer();
  const hexString = Array.from(new Uint8Array(arrayBuffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
  if (selectedFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result;
      setFormData((prevData) => ({
        ...prevData,
        photoFile: selectedFile,
      }));
      setPreviewImage(imageData); // 미리보기 이미지 설정
    };
    reader.readAsDataURL(selectedFile);
  } else {
    setFormData((prevData) => ({
      ...prevData,
      photoFile: null,
    }));
    setPreviewImage(null);
  }
};
    return (
        <div className='write-form'>
        <h2 className='write-name'>글 쓰기</h2>
        <form className='form-style'>
          <div className='animal-group'>
            <label className='animal-type-name'>동물 종류</label>
            <input className='animal-type-form' type="text" name="animalType" value={formData.animalType} onChange={handleChange} required/>
          </div>
          <div className='tel-group'>
            <label className='tel-form-name'>전화번호</label>
            <input className='tel-form' type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required/>
          </div>
          <div className='address-group'>
          <label className='address-serch' onClick={()=>{setPopup(!popup)}}>🔍︎ 주소 검색</label>
               {
                 popup && 
                    <span><Post address={formData.address} setAddress={setAddress}></Post></span>
                    }
            <input
            name='address'
  className='address-name'
  type="text"
  value={formData.address}
  readOnly // 주소 입력 필드를 읽기 전용으로 설정
/>
          </div>
          <div className='memo-group'>
            <label className='memo-name'>메모</label>
            <textarea className='memo-form' name="memo" cols="50" rows="10" value={formData.memo} onChange={handleChange} required/>
          </div>
          <div className='img-group'>
            <label className='img-name'>사진 업로드</label>
            <input name='photoFile' className='img-form' type="file" accept="image/*" onChange={handlePhotoChange}/>
          </div>
          {previewImage && (
  <div>
    <label className='img-preview'>미리보기</label>
    <img src={previewImage} alt="미리보기" style={{maxWidth: '200px', maxHeight: '150px'}}/>
  </div>
)}
          <button onClick={handleSubmit} type="submit" className='form-submit'>글 작성</button>
        </form>
      </div>
    );
};
export default WritePage;
