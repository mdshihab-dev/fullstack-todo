import { useEffect } from "react"
import { useSelector , useDispatch } from "react-redux"
import {useParams} from 'react-router-dom'
import { verifyEmail } from "../features/auth/authSlice"
const VerifyEmail = () => {

  let {token} = useParams()
  let {message} = useSelector(state => state.auth)
  let dispatch = useDispatch()

  useEffect(()=>{
    if (token) {
      dispatch(verifyEmail(token))
    }

  },[token, dispatch])

  return (
    <section className=" bg-main w-full min-h-screen flex flex-col items-center justify-center text-center text-white">
      <div className="shadow-glow relative z-10 w-full max-w-lg p-10 bg-[#121212] rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-semibold "> {message} </h2>
        <p className=" text-base font-medium mt-5">Now you can login your account to get started.</p>
      </div>
    </section>
  )
}

export default VerifyEmail