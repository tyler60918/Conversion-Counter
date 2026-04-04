import { useState } from "react";
import "../stylepages/LandingPage.css";
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
    <div className="landing">
      <img src="../../apple-touch-icon.png" className="logo" />
      <h2 className="title">
        Conversion Counter
      </h2>
      <p className="description">
        Track your individual conversions including accessories, AppleCare, trade-ins, and upgrades, along with your number of appointments and see statistics over time
      </p>
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
    </div>
  )
}

export default LandingPage