import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { clearMessages, registration } from "../features/auth/authSlice"
import {Link} from 'react-router-dom'
import { FaCircleUser, FaEye} from 'react-icons/fa6';
import { MdAlternateEmail, MdOutlineLock} from 'react-icons/md';
import { LuEyeClosed } from "react-icons/lu";
import { useState, useEffect } from 'react';
import { useFormik} from 'formik'
import { registerValidation } from '../validation/formValidation';
import {SyncLoader} from 'react-spinners'
import { toast } from 'react-toastify'

const Registration = () => {
  let inputStyle = 'inputbox-shadow w-full bg-input rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-secondary-text';
  let [passwordVisible, setPasswordVisible] = useState(false);
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let {message, error, loading} = useSelector(state => state.auth)
  let initialValues = {
        username: '',
        email: '',
        password: ''
      }

    let formik = useFormik({
      initialValues: initialValues,
      validationSchema: registerValidation,
      onSubmit: (values) => {
        dispatch(registration(values))
        formik.resetForm();
      }
    })

    useEffect(() => {
      if (message) {
        toast.success(message, { 
          position: "top-right",
          autoClose: 3000 , 
          limit: 1,
         });
        navigate('/login')
        dispatch(clearMessages())
      }
      if (error) {
        toast.error(error, { 
          position: "top-right", 
          autoClose: 3000 ,
          limit: 1});
          dispatch(clearMessages())
      }
    },[message, error, navigate, dispatch])

  let errors = formik.errors
  let touch = formik.touched

  return (
    <>
    <section className="relative min-h-screen w-full flex items-center justify-center  overflow-hidden text-white"> 
      <div className="shadow-glow relative z-10 w-full max-w-lg p-10 bg-[#121212] rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-semibold text-center mb-2">Create Account</h2>
        <p className="text-center text-[15px] text-gray-400 mb-8">
          Already have an account? <Link to="/login" className="text-white ml-0.5 font-medium cursor-pointer hover:underline">Log in</Link>
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="relative">
            <FaCircleUser className=' absolute text-base top-3.5 left-3 text-secondary-text'/>
            <input 
              type="text" 
              name='username'
              placeholder="Username" 
              autoComplete="off"
              className={inputStyle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          {errors.username && touch.username ?
            <div className="text-red-500 text-xs -mt-3 mb-2">{errors.username}</div>
            : null
          }

          <div className="relative">
            <MdAlternateEmail className=' absolute text-base top-3.5 left-3 text-secondary-text'/>
            <input 
              type="email" 
              name='email'
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
              type={passwordVisible ? "text" : "password"} 
              name='password'
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
            loading ? <SyncLoader size={8} color="#ffffff"/> : 'Sign Up'
           }
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="mx-4 text-xs text-gray-500 uppercase">OR REGISTER WITH</span>
          <div className="flex-grow border-t border-white/10"></div>
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
      </div>
    </section>

    {message &&  navigate('/login') }
    {error && console.log(error)}

    </>
  );
};

export default Registration;
