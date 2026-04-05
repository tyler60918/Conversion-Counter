import { useState } from "react";
import "../stylepages/LandingPage.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Button } from "@chakra-ui/react";
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
        Track your individual conversions including accessories, AppleCare, trade-ins, and
        upgrades, along with your number of appointments and see statistics over time
      </p>
      <Button onClick={{}}>
        Sign in to Continue
      </Button>
    </div>
  )
}

export default LandingPage