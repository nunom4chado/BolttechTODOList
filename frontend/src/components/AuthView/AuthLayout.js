import { useState } from "react";

import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import styles from "./AuthView.module.css";

function AuthView() {
  const [isLoginVisible, setIsLoginVisible] = useState(true);

  return (
    <div className={styles.container}>
      {isLoginVisible ? (
        <LoginForm viewRegister={() => setIsLoginVisible(false)} />
      ) : (
        <RegisterForm viewLogin={() => setIsLoginVisible(true)} />
      )}
    </div>
  );
}

export default AuthView;
