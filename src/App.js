import {Route, Routes} from 'react-router-dom';
import postListPage from './pages/postList/postListPage';
import loginPage from './pages/login/loginPage';
import joinPage from './pages/join/joinPage';
import writePage from './pages/write/writePage';
import postReadPage from './pages/postread/postreadPage';

function App() {
  return (
    <Route>
      <Route path='/' element={<postListPage/>}/>
      <Route path='/login' element={<loginPage/>}/>
      <Route path='/join' element={<loginPage/>}/>
      <Route path='/write' element={<writePage/>}/>
      <Route path='/read' element={<postReadPage/>}/>
    </Route>
  );
}

export default App;
