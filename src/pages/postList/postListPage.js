import Navbar from '../../components/Navbar';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./postListPage.css";
import writeimg from "../../img/write.png";

const PostListPage = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUserData = sessionStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    return (
        <div>
            <Navbar/>
            {userData && (
                <Link to="/write" className="write-button">
                    <img src={writeimg} alt="글쓰기 버튼"/>
                </Link>
            )}
        </div>
    );
};

export default PostListPage;
