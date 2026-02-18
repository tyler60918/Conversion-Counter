import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import InputPage from './components/InputPage';
import StatsPage from './components/StatsPage';
import GraphPage from './components/GraphPage';
import { Box, Button, HStack } from "@chakra-ui/react"
import ProtectedRoute from './components/ui/ProtectedRoute';

function App() {
  const navigate = useNavigate();

  return (
    <Box minH="100vh">
      <Box as="nav" mb={6}>
        <HStack spacing={4}>
          <Button onClick={() => navigate('/')}>Home</Button>
          <Button onClick={() => navigate('/input')}>Input</Button>
          <Button onClick={() => navigate('/stats')}>Stats</Button>
          <Button onClick={() => navigate('/graph')}>Graph</Button>
        </HStack>
      </Box>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/input"
          element={
            <ProtectedRoute>
              <InputPage />
            </ProtectedRoute>}
        />
        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <StatsPage />
            </ProtectedRoute>}
        />
        <Route
          path="/graph"
          element={
            <ProtectedRoute>
              <GraphPage />
            </ProtectedRoute>}
        />
      </Routes>
    </Box>
  )
}

export default App
