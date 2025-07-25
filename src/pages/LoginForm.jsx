import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { easeIn } from 'motion';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import Login from '../images/login.gif';
import { useState } from 'react';
import React from 'react';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [isLogedIN, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const userEmail = localStorage.getItem('email');
    const userPassword = localStorage.getItem('password');

    if (!userEmail || !userPassword) {
      toast.warn("Register Yourself!");
      navigate('/register');
    } else if (data.email === userEmail && data.password === userPassword) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      toast.success('Login Successful!');
      navigate('/BBMerchandise');
    } else {
      toast.error('Invalid Credentials or User not found');
    }

    reset();
  };

  return (
    <motion.div
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.5, ease: easeIn }}
      className="flex items-center justify-center text-white py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full mt-30 max-w-6xl mx-auto flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden bg-white">
        
        {/* Left Branding Side */}
        <div className="w-full md:w-1/2 bg-gradient-to-tr from-[#0f0f0f] via-[#1a1a1a] to-[#111111] p-8 sm:p-10 md:p-12 flex flex-col justify-between text-white">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight leading-tight">
              Youthiapa<span className="text-indigo-500">.</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg">
              Welcome back, explorer. Sign in to continue your journey.
            </p>
          </div>
          <img src={Login} className="w-32 h-32 sm:w-40 sm:h-40 mx-auto bg-black rounded-full mt-6 md:mt-0" alt="Login Graphic" />
          <div className="mt-8 text-xs sm:text-sm text-gray-500 text-center">
            <p>Crafted with passion.</p>
            <p>© 2025 Youthiapa</p>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="w-full md:w-1/2 bg-white text-gray-900 p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Sign in</h2>
          <p className="text-gray-500 mb-6 text-sm">Login to your account below.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-600">Email</label>
              <div className="relative mt-1">
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", { required: "Email is required" })}
                  className={`w-full border px-10 py-3 rounded-xl text-sm focus:outline-none transition 
                    ${errors.email ? 'border-red-500 ring-2 ring-red-300' : 'border-gray-300 focus:ring-2 focus:ring-indigo-500'}`}
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-600">Password</label>
              <div className="relative mt-1">
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  className={`w-full border px-10 py-3 rounded-xl text-sm focus:outline-none transition 
                    ${errors.password ? 'border-red-500 ring-2 ring-red-300' : 'border-gray-300 focus:ring-2 focus:ring-indigo-500'}`}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-indigo-600 hover:scale-[1.01] transition-transform duration-300"
            >
              Sign In
            </button>
          </form>

          <p className="text-xs text-center mt-6 text-gray-500">
            Don’t have an account?
            <Link to="/register" className="text-indigo-600 hover:underline ml-1">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginForm;
