import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegister } from "../api/queries";
import { setUser } from "../store/userSlice";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerMutation = useRegister();

  const handleSubmit = async (e) => {
    if (!fullName || !email || !password) {
      alert("Please fill all the fields");
      return;
    }

    e.preventDefault();
    try {
      const result = await registerMutation.mutateAsync({
        fullName,
        email,
        password,
      });
      dispatch(setUser(result.data));
      navigate("/");
      console.log({ result });
    } catch (error) {
      console.log(error);
      alert(error.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <button onClick={() => navigate("/login")}>Go to Login</button>
    </div>
  );
}

export default Register;
