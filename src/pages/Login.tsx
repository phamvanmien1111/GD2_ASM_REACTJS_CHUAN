// src/pages/Login.tsx
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/v1/login", formData);
      const { token, user } = res.data;

      // ✅ Lưu token sau khi đăng nhập thành công
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
        console.log(localStorage.setItem("token", token))
        console.log(localStorage.setItem("user", JSON.stringify(user)))

      // ✅ Chuyển hướng sang trang home
      window.location.href = "/Dashbord";
    }  catch (e: unknown) {
    if (e instanceof Error) {
      console.log("Đăng nhập thất bại", e.message);
    } else {
      console.log("Đăng nhập thất bại");
    }
  }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Tên đăng nhập"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
