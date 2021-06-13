import { useState } from "react";

import InputWithLabel from "../InputWithLabel/InputWithLabel";

function RegisterForm({ viewLogin }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!(username && name && password)) {
      // show error username and password is required
      return;
    }
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
