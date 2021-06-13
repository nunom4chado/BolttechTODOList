import { useState } from "react";
import useAuth from "../../auth/useAuth";
import authService from "../../services/authService";
import InputWithLabel from "../InputWithLabel/InputWithLabel";

function LoginForm({ viewRegister }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(username && password)) {
      setError("Username and Password are required");
      return;
    }

    try {
      const response = await authService.login({ username, password });
      setError("");
      login(response.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

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

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

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
