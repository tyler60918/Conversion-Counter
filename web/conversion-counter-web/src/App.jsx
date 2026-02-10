import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import InputPage from './components/InputPage';
import StatsPage from './components/StatsPage';
import GraphPage from './components/GraphPage';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <nav>
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/input')}>Input</button>
        <button onClick={() => navigate('/stats')}>Stats</button>
        <button onClick={() => navigate('/graph')}>Graph</button>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/graph" element={<GraphPage />} />
      </Routes>
    </>
  )
}

export default App
