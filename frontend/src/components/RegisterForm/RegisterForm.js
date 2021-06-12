function RegisterForm({ viewLogin }) {
  return (
    <form>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input type="name" className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input type="email" className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">
        Register
      </button>

      <button className="d-block center-text btn btn-link" onClick={viewLogin}>
        Already have an account?
      </button>
    </form>
  );
}

export default RegisterForm;
