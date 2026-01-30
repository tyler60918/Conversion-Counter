import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import InputPage from './InputPage';
import StatsPage from './StatsPage';
import GraphPage from './GraphPage';

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
