import { useDispatch, useSelector } from "react-redux"
import { clearMessages, forgotPass } from "../features/auth/authSlice"
import { useFormik } from "formik"
import { forgetPasswordValidation } from "../validation/formValidation"
import { toast } from "react-toastify"
import { FaPaperPlane } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md"
import { SyncLoader } from "react-spinners"
const ForgotPassword = () => {
  let dispatch = useDispatch()
  let {loading} = useSelector(state => state.auth)

  let formik = useFormik({
          initialValues: { email: ''},
          validationSchema: forgetPasswordValidation,
          onSubmit: async (values) => {
            try {
              const res = await dispatch(forgotPass(values)).unwrap();
              toast.success(res?.message, {
                position: "top-right",
                autoClose: 3000,
              });
              formik.resetForm();
            } catch (err) {
              toast.error(err?.error, {
                position: "top-right",
                autoClose: 3000,
              });
            }
            finally{
              dispatch(clearMessages());
            }
          }
        })

  let errors = formik.errors
  let touch = formik.touched

  return (
   <>
     <section className=" w-full min-h-screen flex flex-col items-center justify-center text-center text-white">
      <div className="shadow-glow relative z-10 w-full max-w-lg p-10 bg-[#121212] rounded-2xl shadow-2xl">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold text-center mb-2">Forgot Password?</h2>
        <p className="text-sm font-normal text-center mb-10">Enter your email to receive a reset link.</p>
          <div className="relative">
            <MdAlternateEmail className=' absolute text-base top-3.5 left-3 text-secondary-text'/>
            <input 
              type="email" 
              name="email"
              placeholder="Email address" 
              className={'inputbox-shadow w-full bg-input rounded-lg py-3 px-10 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-secondary-text'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            </div>
        

          {errors.email && touch.email ?
            <div className="text-red-500 text-start text-xs my-2">{errors.email}</div>
            : null
          }
           <button type='submit' className="button mt-4 flex justify-center cursor-pointer w-full bg-[#0070f3] text-white font-medium py-3 rounded-lg transition-all">
           { loading ? 
           <SyncLoader size={8} color="#ffffff"/> 
           : <FaPaperPlane className=" text-xl"/>
            }
          </button>
          </form>
      </div>
    </section>
           
    </>

  )
}

export default ForgotPassword