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
  const isInputPage = location.pathname === '/input';
  const isStatsPage = location.pathname === '/stats';
  const isGraphPage = location.pathname === '/graph';
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
      {/* Don't load nav bar on landing or login page */}
      {!isLandingPage && !isLoginPage && <Box as="nav" mb={6}>
        <HStack spacing={4}>
          <img className="logo" src='../apple-touch-icon.png' />
          <p id='appTitle'>Conversion Counter</p>
          <Button
            className="navButton"
            onClick={() => navigate('/input')}
            bg={isInputPage ? '#e5ecf8' : 'white'}
            color={isInputPage ? '#3973df' : 'gray'}
          >
            Input
          </Button>
          <Button
            className="navButton"
            onClick={() => navigate('/stats')}
            bg={isStatsPage ? '#e5ecf8' : 'white'}
            color={isStatsPage ? '#3973df' : 'gray'}
          >
            Stats
          </Button>
          <Button
            className="navButton"
            onClick={() => navigate('/graph')}
            bg={isGraphPage ? '#e5ecf8' : 'white'}
            color={isGraphPage ? '#3973df' : 'gray'}
          >
            Trends
          </Button>
          <p id='userName'>
            {user.user_metadata.first_name}
          </p>
          <Button
            id="logoutButton"
            onClick={handleLogout}
          >
            Logout
          </Button>
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
