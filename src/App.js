import {Route, Routes} from 'react-router-dom';
import PostListPage from './pages/postList/postListPage';
import LoginPage from './pages/login/loginPage';
import JoinPage from './pages/join/joinPage';
import WritePage from './pages/write/writePage';
import PostReadPage from './pages/postread/postreadPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<PostListPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/join' element={<JoinPage/>}/>
      <Route path='/write' element={<WritePage/>}/>
      <Route path='/read' element={<PostReadPage/>}/>
    </Routes>
  );
}

export default App;
