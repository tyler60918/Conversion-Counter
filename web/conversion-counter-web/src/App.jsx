import './stylesheets/App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import InputPage from './components/InputPage';
import StatsPage from './components/StatsPage';
import GraphPage from './components/GraphPage';
import { Box, Button, HStack } from "@chakra-ui/react"
import ProtectedRoute from './components/ui/ProtectedRoute';
import { supabase } from './components/ui/supabase';
import { useAuth } from "./components/ui/AuthContext";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  const { user } = useAuth()

  async function handleLogout() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Logout error " + error.message)
    } else {
      console.log("Logged out")
    }
  }


  return (
    <Box minH="100vh" w='100%'>
      {/* Don't load logout button on landing, login page, or if not signed in */}
      {!isLandingPage && !isLoginPage && user && (
        <Button
          position="fixed"
          top="20px"
          right="20px"
          onClick={handleLogout}
        >
          Logout
        </Button>
      )}
      {/* Don't load nav bar on landing or login page */}
      {!isLandingPage && !isLoginPage && <Box as="nav" mb={6}>
        <HStack spacing={4}>
          <Button onClick={() => navigate('/input')}>Input</Button>
          <Button onClick={() => navigate('/stats')}>Stats</Button>
          <Button onClick={() => navigate('/graph')}>Graph</Button>
        </HStack>
      </Box>}
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
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
