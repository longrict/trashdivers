import './App.css';
import { Routes, Route } from 'react-router-dom';
import {Header} from './header.js';
import { Home } from './home.js';
import { Login } from './login.js';
// import Map from './map'
import { LoadMap } from './LoadMap.js';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element ={<Home/>}/>
        <Route path='/map' element ={<LoadMap/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>

    </div>
  );
}

export default App;