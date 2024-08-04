import './App.css';
import { Landing } from './landing.js'
import { Routes, Route } from 'react-router-dom';
import { Header } from './header.js';
import { Login } from './login.js';
// import Map from './map'
import { LoadMap } from './LoadMap.js';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element ={<Landing/>}/>
        <Route path='/map' element ={<LoadMap/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>

    </div>
  );
}

export default App;
