import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import './Popuppost.css';

const Post = (props) => {
    const address = props.address;
    const setAddress = props.setAddress;
  
    const onCompletePost = (data) => {
      console.log(data.address);
      setAddress(data.address);
    };
  
    return (
      <>
          <DaumPostcode
            className="postCodeStyle"
            autoClose
            onComplete={onCompletePost}
  
          />
       
      </>
    );
  };
  
  export default Post;