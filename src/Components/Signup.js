import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import "./Auth.css";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = (e) => {

    e.preventDefault();

    localStorage.setItem(
      "user",
      JSON.stringify(form)
    );

    alert("Signup Successful ✅");

    navigate("/login");
  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>Create Account</h1>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            required
            onChange={handleChange}
          />

          <button type="submit">
            Signup
          </button>

        </form>

        <p
          className="switch-text"
          onClick={() =>
            navigate("/login")
          }
        >
          Already have an account? Login
        </p>

      </div>

    </div>
  );
}

export default Signup;