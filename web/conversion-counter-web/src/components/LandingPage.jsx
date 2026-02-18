import { useState } from "react";
import "../App.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {
  VStack,
  Button,
} from "@chakra-ui/react";
import { useAuth } from "./ui/AuthContext";

function LandingPage() {
  const [submitType, setSubmitType] = useState('')
  const { user } = useAuth()

  return (
    <VStack>
      <h1>
        Conversion Counter
      </h1>
      <div className="formButtons">
        {submitType == '' && !user && <Button onClick={() => { setSubmitType('register') }}>
          Register
        </Button>}
        {submitType == '' && !user && <Button onClick={() => { setSubmitType('sign in') }}>
          Sign in
        </Button>}

        {/* // Register new user */}
        {submitType == 'register' && !user && <RegisterForm />}

        {/* // Sign in existing user */}
        {submitType == 'sign in' && !user && <LoginForm />}

        {user && <div>
          <p>Logged In!</p>
          <p>Welcome {user?.user_metadata.first_name} {user?.user_metadata.last_name}</p>
        </div>}
      </div>
    </VStack>
  )
}

export default LandingPage