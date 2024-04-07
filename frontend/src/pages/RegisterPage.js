import React, { useState } from "react";
import logo from "../img/logo1.png"; // Correct the path to your logo image

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password1: "",
    password2: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if passwords match
    if (formData.password1 !== formData.password2) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone_number: formData.phone_number,
          password: formData.password1,
        }),
      });

      const data = await response.json();
      if (response.status === 201) {
        console.log("User created successfully", data);
        // Redirect or show a success message
        // Assuming you have a path to login that you want to redirect to after successful registration
        window.location.href = "/login";
      } else {
        alert("An error occurred: " + data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <div className="bg-custom-gradient flex flex-col justify-between h-screen">
      <div className="p-4 flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => (window.location.href = "login")} 
        >
          Login
        </button>
      </div>
      <main className="flex-col flex items-center justify-center">
        <img src={logo} alt="MeetHomie Logo" className="mb-4" />
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md w-full max-w-sm">
          <form id="createAccountForm" onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
              <input type="text" id="username" name="username" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value={formData.username} onChange={handleChange} />
            </div>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input type="email" id="email" name="email" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value={formData.email} onChange={handleChange} />
            </div>
            {/* First Name Field */}
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name:</label>
              <input type="text" id="first_name" name="first_name" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value={formData.first_name} onChange={handleChange} />
            </div>
            {/* Last Name Field */}
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name:</label>
              <input type="text" id="last_name" name="last_name" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value={formData.last_name} onChange={handleChange} />
            </div>
            {/* Phone Number Field */}
            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number:</label>
              <input type="text" id="phone_number" name="phone_number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value={formData.phone_number} onChange={handleChange} />
            </div>
            {/* Password Field */}
            <div>
              <label htmlFor="password1" className="block text-sm font-medium text-gray-700">Password:</label>
              <input type="password" id="password1" name="password1" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value={formData.password1} onChange={handleChange} />
            </div>
            {/* Confirm Password Field */}
            <div>
              <label htmlFor="password2" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
              <input type="password" id="password2" name="password2" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value={formData.password2} onChange={handleChange} />
            </div>
            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Account</button>
          </form>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-gray-600">
        <p>Copyright 2024 by MeetHomie.Inc.</p>
      </footer>
    </div>
  );
};

export default RegisterPage;