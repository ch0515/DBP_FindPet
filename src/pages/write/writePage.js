import React, { useState } from 'react';
import {DaumPostcode, useDaumPostcodePopup} from 'react-daum-postcode';
import './writePage.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Post from '../../components/Popuppost';

const WritePage = () => {
  const navigate = useNavigate();
    const [popup, setPopup] = React.useState(false);
    const [animalType, setAnimalType] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [photoFile, setPhotoFile] = useState(null);
    const [memo, setMemo] = useState('');
    const [selectedImage, setSelectedImage] = useState(null); // 추가된 부분
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // FormData 생성
      const formData = new FormData();
      formData.append('animalType', animalType);
      formData.append('phoneNumber', phoneNumber);
      formData.append('address', address);
      formData.append('memo', memo);
        if (photoFile) {
          formData.append('photo', photoFile);
        }else{
      setSelectedImage(null); // 폼 제출 후 미리보기 이미지 초기화
        }
        
      try{
        const response = await axios.post('http://localhost:3001/post', formData, {
          headers: {
            'Content-Type' : 'multipart/form-data',
          },
        });
        console.log('서버 응답 : ', response.data);
        navigate("/")
      }catch(error){
        console.error('폼 제출 에러 : ', error);
      }
    };
  
    const handlePhotoChange = (event) => {
      const selectedFile = event.target.files[0];
      setPhotoFile(selectedFile);
      //setSelectedImage(URL.createObjectURL(selectedFile)); // 미리보기 이미지 설정
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
  
      if (selectedFile) {
        setSelectedImage(URL.createObjectURL(selectedFile)); // 미리보기 이미지 설정
      } else {
        setSelectedImage(null);
      }
    };
    return (
        <div className='write-form'>
        <h2 className='write-name'>글 쓰기</h2>
        <form onSubmit={handleSubmit} className='form-style'>
          <div className='animal-group'>
            <label className='animal-type-name'>동물 종류</label>
            <input className='animal-type-form' type="text" value={animalType} onChange={(e) => setAnimalType(e.target.value)} required/>
          </div>
          <div className='tel-group'>
            <label className='tel-form-name'>전화번호</label>
            <input className='tel-form' type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
          </div>
          <div className='address-group'>
          <label className='address-serch' onClick={()=>{setPopup(!popup)}}>🔍︎ 주소 검색</label>
               {
                 popup && 
                    <span><Post address={address} setAddress={setAddress}></Post></span>
                    }
            <span className='address-name'>{address}</span>
          </div>
          <div className='memo-group'>
            <label className='memo-name'>메모</label>
            <textarea className='memo-form' cols="50" rows="10" value={memo} onChange={(e) => setMemo(e.target.value)} required/>
          </div>
          <div className='img-group'>
            <label className='img-name'>사진 업로드</label>
            <input className='img-form' type="file" accept="image/*" onChange={handlePhotoChange}/>
          </div>
          {selectedImage && (
            <div>
              <label className='img-preview'>미리보기</label>
              <img src={selectedImage} alt="미리보기"style={{maxWidth: '200px', maxHeight: '150px'}}/>
            </div>
          )}
          <button type="submit" className='form-submit'>글 작성</button>
        </form>
      </div>
    );
};
export default WritePage;
