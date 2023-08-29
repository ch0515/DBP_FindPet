import Navbar from '../../components/Navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./postListPage.css";
import writeimg from "../../img/write.png";
import ImageViewer from '../../components/ImageViewer';

const PostListPage = () => {
    const [userData, setUserData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [, setForceRender] = useState();
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const storedUserData = sessionStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }

        axios.get('http://localhost:3002/image', { responseType: 'arraybuffer' })
            .then(response => {
                const imageBlob = new Blob([response.data], { type: 'image/jpeg' }); // 이미지 타입에 맞게 설정
                setImageSrc(URL.createObjectURL(imageBlob));
            })
            .catch(error => {
                console.error('이미지 가져오기 실패', error);
            });
        axios.get("http://localhost:3002/posts")
            .then(response => {
                const dataFromServer = response.data;
                // 가져온 데이터를 상태에 저장
                console.log(dataFromServer);
                setPosts(dataFromServer);
                setForceRender({});
            })
            .catch(error => {
                console.error('데이터 가져오기 실패:', error);
            });
    }, []);

    return (
        <div>
            <Navbar/>
            {userData && (
                <Link to="/write" className="write-button">
                    <img src={writeimg} alt="글쓰기 버튼"/>
                </Link>
            )}
            <div className="post-box">
                <div className='post-grid'>
                    {posts.map(post => (
                        <div key={post[0]} className="post-list">
                            {/* <img src={`http://localhost:3002/images/${post[3]}`} alt="Post Image"/> */}
                            <img src={imageSrc} alt="이미지" />
                            <p>전화번호 : {post[0]}</p>
                            <p>종류 : {post[1]}</p>
                            <p>주소 : {post[2]}</p>
                            <p>설명 : {post[4]}</p>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    );
};

export default PostListPage;
