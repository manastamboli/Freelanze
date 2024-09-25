import React, { useState } from "react";
import RegisterImage from "../Images/RegisterImage.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function RegisterPage({ handleTabChange }) {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("freelancer");
  const navigate = useNavigate();


  function handleLoginRoute() {
    navigate("/login");
  }


  const handleusernameChange = (e) => {
    setusername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleProfessionChange = (e) => {
    setProfession(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Log the form data to the console
      console.log("username:", username);
      console.log("email:", email);
      console.log("Password:", password);
      console.log("proffession",profession)

      // Send the form data to your backend for authentication or registration
      const response = await axios.post("https://freelanze-backend.onrender.com/api/addUser", {
        userName: username,
        userEmail: email,
        userPassword: password,
        role:profession
      });

      // Handle the response from your backend
      if ((response.data.data.success)) {
        console.log("User successfully registered/logged in",response.data);
        if (profession === 'freelancer') {
          navigate("/skills");
      } else {
          console.log("User is not a freelancer, staying on current page.");
          navigate("/")
      }
      } else {
        console.error("Error:", response.data.message);
        // Handle the error or show the error message to the user
      }
    } catch (error) {
      console.log("error is ",error)
      console.error(
        "Error:",
        error.response ? error.response.data.message : error.message
      );
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div
        className="bg-white rounded-3xl shadow-xl p-8"
        style={{ width: "450px" }}>
        <h2 className="text-3xl font-bold mb-6 text-blue-500 text-center">
          Sign up
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              onChange={handleusernameChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="profession"
              className="block text-gray-700 text-sm font-bold mb-2">
              Select Your Proffesion
            </label>
            <select
              className="hadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              onChange={handleProfessionChange}>
              <option>freelancer</option>
              <option>employer</option>
            </select>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-600 text-sm">
                I accept the <a className="text-blue-500">Terms of Use</a> &{" "}
                <a className="text-blue-500">Privacy Policy</a>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline">
              Sign up
            </button>
          </div>

          <div className="text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700"
              onClick={() => handleLoginRoute()}>
              Login
            </a>
          </div>
        </form>
      </div>
      <div className="justify-start">
        {" "}
        <img
          src={RegisterImage}
          alt="Description of the image"
          style={{ width: "700px", height: "600px" }}
        />{" "}
      </div>
    </div>
  );
}

export default RegisterPage;
