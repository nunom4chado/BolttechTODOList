import { useState } from "react";
import useAuth from "../../auth/useAuth";

function LoginForm({ viewRegister }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!(username && password)) {
      // show error username and password is required
      return;
    }

    login({ username, password });
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Login
      </button>

      <button className="btn btn-link" onClick={viewRegister}>
        Don't have an account?
      </button>
    </form>
  );
}

export default LoginForm;
