import { clearMessages, login } from "../features/auth/authSlice"
import { Link, useNavigate } from "react-router-dom"
import { MdAlternateEmail, MdOutlineLock} from 'react-icons/md';
import { useState } from "react";
import { LuEyeClosed } from "react-icons/lu";
import { FaEye} from 'react-icons/fa6';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginValidation } from "../validation/formValidation";
import {SyncLoader} from 'react-spinners'
import { toast } from 'react-toastify'

const Login = () => { 
  let inputStyle = 'inputbox-shadow w-full bg-input rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-secondary-text';
  let [passwordVisible, setPasswordVisible] = useState(false);
  let dispatch = useDispatch()
  let navigation = useNavigate()
  let {loading} = useSelector(state => state.auth)
    let initialValues = {
        email: '',
        password: '' 
    }

  let formik = useFormik({
        initialValues: initialValues,
        validationSchema: loginValidation,
        onSubmit: async(values) => {
          try {
            const res = await dispatch(login(values)).unwrap();
            toast.success(res?.message, {
              position: "top-right",
              autoClose: 3000,
            });
            formik.resetForm();
            navigation('/');
          } catch (err) {
            toast.error(err?.error, {
              position: "top-right",
              autoClose: 3000,
            })  
          }
          finally {
              dispatch(clearMessages());
            }
        }
      })

  let errors = formik.errors
  let touch = formik.touched

  return (
    <>
    <section className="relative min-h-screen w-full flex items-center justify-center  overflow-hidden text-white">
      <div className="shadow-glow relative z-10 w-full max-w-lg p-10 bg-[#121212] rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-semibold text-center mb-2">Welcome Back</h2>
        <p className="text-center text-[15px] text-gray-400 mb-8">
          Don't have an account? <Link to='/register' className="text-white ml-0.5 font-medium cursor-pointer hover:underline">Sign Up</Link>
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="relative">
            <MdAlternateEmail className=' absolute text-base top-3.5 left-3 text-secondary-text'/>
            <input 
              type="email" 
              name="email"
              placeholder="Email address" 
              autoComplete="off"
              className={inputStyle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          {errors.email && touch.email ?
            <div className="text-red-500 text-xs -mt-3 mb-2">{errors.email}</div>
            : null
          }

          <div className="relative">
            <MdOutlineLock className=' absolute text-base top-3.5 left-3 text-secondary-text'/>
            <input 
              type={passwordVisible ? 'text' : "password"} 
              name="password"
              placeholder="Password" 
              autoComplete="off"
              className={inputStyle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {
             passwordVisible ?
              <LuEyeClosed onClick={()=> setPasswordVisible(false)} className=' cursor-pointer absolute text-base top-3.5 right-4 text-secondary-text'/>
              :
              <FaEye onClick={()=> setPasswordVisible(true)} className=' cursor-pointer absolute text-base top-3.5 right-4 text-secondary-text'/>
             }
          </div>

          {errors.password && touch.password ?
            <div className="text-red-500 text-xs -mt-3 mb-2">{errors.password}</div>
            : null
          }

          <button type='submit' className="button cursor-pointer w-full bg-[#0070f3] text-white font-medium py-3 rounded-lg mt-2 transition-all">
           {
            loading ? <SyncLoader size={8} color="#ffffff"/> : 'Login'
           }
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="grow border-t border-white/10"></div>
          <span className="mx-4 text-xs text-gray-500 uppercase">OR REGISTER WITH</span>
          <div className="grow border-t border-white/10"></div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button className="flex cursor-pointer items-center justify-center bg-[#1a1a1a] shadow-button py-2.5 rounded-lg hover:bg-white/10 transition-colors">
            <span className="text-lg font-bold">F</span>
          </button>
          <button className="flex cursor-pointer items-center justify-center bg-[#1a1a1a] shadow-button py-2.5 rounded-lg hover:bg-white/10 transition-colors">
            <span className="text-lg font-bold">G</span>
          </button>
          <button className="flex cursor-pointer items-center justify-center bg-[#1a1a1a] shadow-button py-2.5 rounded-lg hover:bg-white/10 transition-colors">
            <span className="text-lg font-bold">X</span>
          </button>
        </div>

        <p className="mt-4 text-center">
          <Link to="/forgot-password" className=" text-xs text-[#0070f3] hover:underline">
          Forgot Password?
          </Link>
        </p>
      </div>
    </section>

    </>
  );
};

export default Login;