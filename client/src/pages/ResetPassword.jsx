import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetPass } from "../features/auth/authSlice"
import {useNavigate, useParams} from 'react-router-dom'
import { SyncLoader } from "react-spinners"
import { resetPasswordValidation } from "../validation/formValidation"
import { useFormik } from "formik"
import { toast } from "react-toastify"
const ResetPassword = () => {
  let {message, error,loading} = useSelector(state => state.auth)
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let token = useParams()

     let formik = useFormik({
              initialValues: {resetToken: token , password: ''},
              validationSchema: resetPasswordValidation,
              onSubmit: (values) => {
                formik.values.password = values.password
                console.log(values)
                dispatch(resetPass(values))
                formik.resetForm();
              }
            })
      
       useEffect(() => {
            if (message) {
              toast.success(message, { position: "top-right", autoClose: 3000 });
              navigate('/login')
            }
            if (error) {
              toast.error(error, { position: "top-right", autoClose: 3000 });
            }
        }, [message, error])
    
      let errors = formik.errors
      let touch = formik.touched

  return (
    <>
      <section className=" bg-main w-full min-h-screen flex flex-col items-center justify-center text-center text-white">
            <div className="shadow-glow relative z-10 w-full max-w-lg p-10 bg-[#121212] rounded-2xl shadow-2xl">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold text-center mb-2">Create new password</h2>
              <p className="text-sm font-normal text-center mb-10">Enter new password to change your password.</p>
                <div className="relative">
                  <input 
                    type="password" 
                    name="password"
                    placeholder="New password" 
                    className={'inputbox-shadow w-full bg-input rounded-lg py-3 px-5 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-secondary-text'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  </div>
              
      
                {errors.password && touch.password ?
                  <div className="text-red-500 text-start text-xs my-2">{errors.password}</div>
                  : null
                }
                 <button type='submit' className="button mt-4 flex justify-center cursor-pointer w-full bg-[#0070f3] text-white font-medium py-3 rounded-lg transition-all">
                 { loading ? 
                 <SyncLoader size={8} color="#ffffff"/> 
                 : 'Save password'
                  }
                </button>
                </form>
            </div>
          </section>
    </>
  )
}

export default ResetPassword