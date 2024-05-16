import React, { useState } from "react";
import SpinnerIcon from "@/components/icons";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../actions/Authentification/LoginProvider";
import { useEffect } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { axiosInstance } from "../../axiosInstance";
import { APIURL } from "../../lib/ApiKey";
import { getRestaurant } from "../../actions/Restaurant/Restaurant";
import { useDispatch } from 'react-redux';
import { setRestoInfo } from '../lib/restoSlice';

function Login({ onLogin, className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("")
  const [users, setUsers] = useState([])
  // const [restoInfo, setRestoInfo] = useState([])
  
  const navigate = useNavigate();
  // const { isLoggedIn, login, logout, ErrorMsg } = useLogin();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

   const handleNavigation = () => {

    const response = login('admin@gmail.com', 'password')
    if(response)
    {
      console.log("Login Succesed", response);
    }
    // navigate("/Dashboard");
  };
  // // Fonction pour gérer la soumission du formulaire
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Vérifier les identifiants
  //   if (email === "admin@gmail.com" && password === "123456") {
  //     // Authentification réussie, appeler la fonction onLogin fournie par le parent
  //     onLogin();
  //     console.log(tru);
  //   } else {
  //     setError("Email or password is incorrect");
  //   }
  // };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const login = async (email, password, navigate) => {
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); // Fetch CSRF token from meta tag
      const response = await axiosInstance.post(`${APIURL}/api/auth/login`, {
        login: email,
        password,
      }, {
        headers: {
          'X-CSRF-TOKEN': csrfToken // Include CSRF token in the request headers
        }
      });
  
      if (response.status === 200) {
        setIsLoading(true);
        console.log("The Response => ", response.data.user.id);
        if(response.data.user.id)
        {
          sessionStorage.setItem('dataItem', JSON.stringify(response.data.user.id));
          sessionStorage.setItem('tokenData', JSON.stringify(response.data));
          sessionStorage.setItem('isLoggedIn', "loggin");
          let Id = JSON.stringify(response.data.user.id)

          // console.log("The Id => ",Id);
          const restoResponse = await axiosInstance.get(`/api/getResto/` + Id,); 
          if (restoResponse.data) {
            // dispatch(setRestoInfo(restoResponse.data));
            sessionStorage.setItem('RestoInfo', JSON.stringify(restoResponse.data));
          }
        }
        navigate("/");
      } else {
        setIsLoading(false);
      }
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      setError("Email or password are incorrect")
      setIsLoading(false);
    }
  };
  const onSubmit = async () => {
    setIsLoading(true);
      const response = login(email, password, navigate);

    
    if(response)
    {
      console.log("Login Succesed", response);
      setUserId(JSON.parse(response.id))
      // navigate("/Dashboard");
      // setTimeout(() => {
      //   // setIsLoading(false);
      // }, 1000);
    }
    else{
      console.log("Incoreect");
      // setError('Email or password is incorrect')
    }
    setIsLoading(false);
  };
  console.log("The logg Id =>", userId);

  return (
    <>

      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* <Link
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link> */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <div>
              {" "}
              <h1 className="text-4xl font-bold ">
                gar<span className="text-blue-700">i</span>sta
              </h1>
            </div>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>

        <div className="lg:p-8 pt-44">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email & password
              </p>
            </div>
            <div className={cn("grid gap-6", className)}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <Input
                      className={"focus-visible:ring-white"}
                      id="email"
                      placeholder="name@example.com"
                      // type="email"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...register('email', { required: 'Email is required', pattern: { value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/, message: 'Invalid email address' } })}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  </div>
                  <div className="grid gap-4 relative">
                    <Input
                      id="password"
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      // className={errors.password.message ? "outline-red-800 border-red-400 focus-visible:ring-white" : "bg-red-300"}
                      className={"focus-visible:ring-white"}
                      autoCapitalize="none"
                      autoComplete="current-password"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...register('password', { required: 'Password is required' })}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-2"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="17"
                          fill="currentColor"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          {/* SVG pour afficher le mot de passe */}
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="17"
                          fill="currentColor"
                          className="bi bi-eye-slash "
                          viewBox="0 0 16 16"
                        >
                          {/* SVG pour masquer le mot de passe */}
                        </svg>
                      )}
                    </button>
                  </div>

                  <Button disabled={isLoading}>
                    {isLoading ? (
                      <SpinnerIcon
                        size={32}
                        color="white"
                        className="mr-2 h-4 w-4 animate-spin"
                      />
                    ) : (
                      "Login"
                    )}
                  </Button>
                  {/* {ErrorMsg && <p className="text-red-500 text-sm">{ErrorMsg}</p>} */}

                </div>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
              </div>
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <a
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
