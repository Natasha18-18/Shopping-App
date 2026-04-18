import { useNavigate } from "react-router-dom";
import "./Login.css"

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/checkout"); // 👉 only go to form
  };

  return (
    <div className="main-login">
      <h2>Login</h2>
      <button onClick={handleLogin}>Continue</button>
    </div>
  );
}

export default Login;