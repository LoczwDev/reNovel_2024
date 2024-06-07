// Register.js
import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [state, setstate] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const { name, email, password, otp } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setstate(!state);
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      console.log(response.data);
      // Gửi mã OTP đến email của người dùng
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post("/api/users/verifyOTP", { email, otp });
      console.log(response.data);
      // Xử lý khi xác nhận OTP thành công
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      {state && (
        <div>
          <input
            type="text"
            name="otp"
            value={otp}
            onChange={handleChange}
            required
          />
          <button onClick={handleVerifyOTP}>Verify OTP</button>
        </div>
      )}
    </div>
  );
}

export default Register;
