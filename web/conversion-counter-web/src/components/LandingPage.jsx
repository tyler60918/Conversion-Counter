import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "../stylesheets/LandingPage.module.css";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../components/ui/AuthContext";

function LandingPage() {
  const [submitType, setSubmitType] = useState('')
  const navigate = useNavigate();
  const { user } = useAuth()

  return (
    <div className={styles.landing}>
      <img src="../../apple-touch-icon.png" className={styles.logo} />
      <h2 className={styles.title}>
        Conversion Counter
      </h2>
      <p className={styles.description}>
        Track your individual conversions including accessories, AppleCare, trade-ins, and
        upgrades, along with your number of appointments and see statistics over time
      </p>
      <Button onClick={() => {
        if (user) {
          navigate("/input")
        } else {
          navigate("/login")
        }
      }}>
        Sign in to Continue
      </Button>
    </div>
  )
}

export default LandingPage