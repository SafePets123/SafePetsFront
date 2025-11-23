import { Routes, Route } from 'react-router-dom';
import App from './App';
import Cad from './pages/cad';
import Cadastroorgao from './pages/cadastrarorgao';
import Cadastroong from './pages/cadastrarong';
import Cadastrodenunciante from './pages/cadastrardenunciante';
import Ent from './pages/ent';
import Denuncie from './pages/denuncie';
import Saiba from './pages/saiba';
import DashboardDenunciante from './pages/DashboardDenunciante';
import DashboardOng from './pages/dashboardOng';
import DashboardAutoridade from './pages/dashboardAutoridade';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/cadastro" element={<Cad />} />
      <Route path="/cadastrarorgao" element={<Cadastroorgao />} />
      <Route path="/cadastrarong" element={<Cadastroong />} />
      <Route path="/cadastrodenunciante" element={<Cadastrodenunciante />} />
      <Route path="/entrar" element={<Ent />} />
      <Route path="/denuncie" element={<Denuncie />} />
      <Route path="/saibamais" element={<Saiba />} />

      <Route path="/DashboardDenunciante" element={<DashboardDenunciante />} />
      <Route path="/dashboardOng" element={<DashboardOng />} />
      <Route path="/dashboardAutoridade" element={<DashboardAutoridade />} />
    </Routes>
  );
}
