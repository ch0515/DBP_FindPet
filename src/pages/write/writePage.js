import React, { useState } from 'react';
import {DaumPostcode, useDaumPostcodePopup} from 'react-daum-postcode';
import './writePage.css';
import Post from '../../components/Popuppost';

const WritePage = () => {
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
      }
  
      // FormData를 서버로 업로드 (동일한 코드 유지)
  
      setSelectedImage(null); // 폼 제출 후 미리보기 이미지 초기화
    };
  
    const handlePhotoChange = (event) => {
      const selectedFile = event.target.files[0];
      setPhotoFile(selectedFile);
      setSelectedImage(URL.createObjectURL(selectedFile)); // 미리보기 이미지 설정
    };
    return (
        <div>
        <h2>글 쓰기</h2>
        <form onSubmit={handleSubmit} className='form-style'>
          <div>
            <label>동물 종류</label>
            <input
              type="text"
              value={animalType}
              onChange={(e) => setAnimalType(e.target.value)}
              required
            />
          </div>
          <div>
            <label>전화번호</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div>
          <label
                onClick={()=>{
                  setPopup(!popup)
                }}
                >🔍︎ 주소 검색</label>
               {
                 popup && 
                    <span><Post address={address} setAddress={setAddress}></Post></span>
                    }
            <span>{address}</span>
          </div>
          <div>
            <label>메모</label>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              required
            />
          </div>
          <div>
            <label>사진 업로드</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>
          {selectedImage && (
            <div>
              <label>미리보기</label>
              <img src={selectedImage} alt="미리보기" />
            </div>
          )}
          <button type="submit">글 작성</button>
        </form>
      </div>
    );
};
export default WritePage;
