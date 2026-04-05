import { Box, Button } from "@chakra-ui/react"
import { useState } from "react"
import "../stylepages/LoginPage.css"
import LoginForm from "./LoginForm"
import { useAuth } from "./ui/AuthContext";
import RegisterForm from "./RegisterForm";

function LoginPage() {
  const { user } = useAuth()
  const [emailLogin, setEmailLogin] = useState(false)
  const [emailRegister, setEmailRegister] = useState(false)

  return (
    <div className="login-page">
      <Box className="login-box">
        <img src="../../apple-touch-icon.png" className="logo" />
        <h2 className="title">Sign up for Genius Bar Conversion Counter</h2>
        {!emailLogin && !emailRegister && <div className="login-buttons">
          <Button>
            Continue with Google
          </Button>
          <Button>
            Continue with Apple
          </Button>
          <Button onClick={() => setEmailRegister(true)}>
            Continue with Email
          </Button>
        </div>}
        {emailRegister && <RegisterForm />}
        {emailLogin && <LoginForm />}
        {emailRegister && <div className="login-instead">
          <p>Already have an account?</p>
          <Button onClick={() => {
            setEmailLogin(true)
            setEmailRegister(false)
          }}>
            Login
          </Button>
        </div>}
      </Box>
    </div>
  )
}

export default LoginPage