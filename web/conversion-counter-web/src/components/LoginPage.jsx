import { Box, Button } from "@chakra-ui/react"
import { useState } from "react"
import styles from "../stylesheets/LoginPage.module.css"
import LoginForm from "./LoginForm"
import { useAuth } from "./ui/AuthContext";
import RegisterForm from "./RegisterForm";
import { supabase } from '../components/ui/supabase';

function LoginPage() {
  const { user } = useAuth()
  const [emailLogin, setEmailLogin] = useState(false)
  const [emailRegister, setEmailRegister] = useState(false)

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${import.meta.env.VITE_APP_URL}/input` // Redirects to either the production website if production build or localserver if in dev.
      }
    })
    if (error) console.error(error.message)
  }

  return (
    <div className={styles.loginPage}>
      <Box className={styles.loginBox}>
        <img src="../../apple-touch-icon.png" className={styles.logo} />
        <h2 className={styles.title}>Sign up for Genius Bar Conversion Counter</h2>
        {!emailLogin && !emailRegister && <div className={styles.loginButtons}>
          <Button onClick={signInWithGoogle}>
            Continue with Google
          </Button>
          <Button onClick={() => setEmailRegister(true)}>
            Continue with Email
          </Button>
        </div>}
        {emailRegister && <RegisterForm />}
        {emailLogin && <LoginForm />}
        {emailRegister && <div className={styles.loginInstead}>
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