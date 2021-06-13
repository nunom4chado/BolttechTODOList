import { useState } from "react";
import useAuth from "../../auth/useAuth";
import InputWithLabel from "../InputWithLabel/InputWithLabel";

function LoginForm({ viewRegister }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!(username && password)) {
      // show error username and password is required
      return;
    }

    login({ username, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputWithLabel
        containerClasses="mb-3"
        label="Username"
        value={username}
        handleValueChange={(e) => setUsername(e.target.value)}
      />
      <InputWithLabel
        containerClasses="mb-3"
        label="Password"
        value={password}
        isPassword
        handleValueChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" className="btn btn-primary">
        Login
      </button>

      <button className="btn btn-link d-block mx-auto" onClick={viewRegister}>
        Don't have an account?
      </button>
    </form>
  );
}

export default LoginForm;
