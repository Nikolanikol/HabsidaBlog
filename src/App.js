import logo from './logo.svg';
import './App.css';

import PostList from './Components/PostList/PostList';
import { Header } from 'antd/es/layout/layout';
import HeaderComponent from './Components/Header/HeaderComponent';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostIdPage from './pages/PostIdPage';
import CreateUser from './pages/CreateUser';
import SignInPage from './pages/SignInPage';
import EditProfile from './Components/EditProfile/EditProfile';
import CreateArticlePage from './pages/CreateArticlePage';
import EditArticlePage from './pages/EditArticlePage';

function App() {
  




  return (
            <div className='App '>
                <HeaderComponent/>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/post/:slug' element={<PostIdPage/>}/>
                    <Route path='/createuser' element={<CreateUser/>}/>
                    <Route path='/signin' element={<SignInPage/>}/>
                    <Route path='/editprofile' element={<EditProfile/>}/>
                    <Route path='/editearticle/:slug' element={<EditArticlePage/>}/>
                    <Route path='/createarticle' element={<CreateArticlePage/>}/>
                </Routes>
            </div>
  );
}

export default App;
