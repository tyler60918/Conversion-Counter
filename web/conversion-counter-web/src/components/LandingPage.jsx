import { useState } from "react";
import "../App.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {
  VStack,
} from "@chakra-ui/react";

function LandingPage() {
  const [submitType, setSubmitType] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  function handleLoginStatus(value) {
    setLoggedIn(value)
  }

  return (
    <VStack>
      <h1>
        Conversion Counter
      </h1>
      <div className="formButtons">
        {submitType == '' && <button onClick={() => { setSubmitType('register') }}>
          Register
        </button>}
        {submitType == '' && <button onClick={() => { setSubmitType('sign in') }}>
          Sign in
        </button>}

        {/* // Register new user */}
        {submitType == 'register' && !loggedIn && <RegisterForm sendLoginStatus={handleLoginStatus} />}

        {/* // Sign in existing user */}
        {submitType == 'sign in' && !loggedIn && <LoginForm sendLoginStatus={handleLoginStatus} />}

        {loggedIn && <p>Logged In!</p>}
      </div>



    </VStack>
  )
}

export default LandingPage