import Navbar from '../../components/Navbar';
import React from 'react';
import { Link } from 'react-router-dom';
import "./postListPage.css";
import writeimg from "../../img/write.png";

const PostListPage = () => {
    return (
      <div>
        <Navbar/>
        <Link to="/write" className="write-button">
          <img src={writeimg} ale="글쓰기 버튼"/>
        </Link>
      </div>
    );
};
export default PostListPage;