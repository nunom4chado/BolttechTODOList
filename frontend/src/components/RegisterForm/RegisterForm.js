import { useState } from "react";
import authService from "../../services/authService";

import InputWithLabel from "../InputWithLabel/InputWithLabel";

function RegisterForm({ viewLogin }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(username && name && password)) {
      // show error username and password is required
      return;
    }

    try {
      await authService.register({ username, name, password });
      setRegisterSuccess(true);
      setError("");
    } catch (error) {
      setRegisterSuccess(false);
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
        label="Name"
        value={name}
        handleValueChange={(e) => setName(e.target.value)}
      />
      <InputWithLabel
        containerClasses="mb-3"
        label="Password"
        value={password}
        isPassword
        handleValueChange={(e) => setPassword(e.target.value)}
      />

      {registerSuccess && (
        <div className="alert alert-success" role="alert">
          Registration successfully you can login now.
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <button type="submit" className="btn btn-primary">
        Register
      </button>

      <button className="btn btn-link d-block mx-auto" onClick={viewLogin}>
        Already have an account?
      </button>
    </form>
  );
}

export default RegisterForm;
