import './css/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Juego from './pages/Juego';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import CRUDPreguntas from './components/CRUDPreguntas';
import Resultado from './pages/Resultado';
import Perfil from './pages/Perfil';
import ReproductorMusica from './components/ReproductorMusica';

function App() {

 return (
  <>
    <BrowserRouter> {/* <--- ESTO ES LO QUE HACE QUE FUNCIONEN LOS HOOKS */}
    <Header/>
       {/* 🎵 AQUÍ */}
      <Routes>
        <Route path="/login" element={<Login />} />
         <Route path="/juego" element={<Juego />} />
         <Route path="/resultados" element={<Resultado />} />
         <Route path="/perfil" element={<Perfil />} />
         <Route path="/admin/dashboard" element={<CRUDPreguntas />} />
         <Route path="*" element={<div>Página no encontrada</div>} />
        
      
        
      </Routes>
    <ReproductorMusica/>
    <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App