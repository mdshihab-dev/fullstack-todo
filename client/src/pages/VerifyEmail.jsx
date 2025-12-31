import { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, Link } from 'react-router-dom'
import { clearMessages, verifyEmail } from "../features/auth/authSlice"

const VerifyEmail = () => {
  const { token } = useParams()
  const dispatch = useDispatch()
  
  const calledOnce = useRef(false)

  const { message, error , loading } = useSelector((state) => state.auth)

  useEffect(() => {
    if (token && !calledOnce.current) {
      dispatch(verifyEmail(token))
      calledOnce.current = true
      dispatch(clearMessages())
    }
  }, [token, dispatch])

  return (
    <section className="bg-main w-full min-h-screen flex flex-col items-center justify-center text-center text-white p-4">
      <div className="shadow-glow relative z-10 w-full max-w-lg p-10 bg-form-bg rounded-2xl shadow-2xl">

        {loading ? (
          <div className="animate-pulse">
            <h2 className="text-2xl font-semibold text-gray-300">Verifying Email...</h2>
          </div>
        ) : (
          <>
            <h2 className={`text-2xl font-semibold ${error ? "text-red-400" : "text-green-400"}`}>
              {message? "Verification Successful!" : "Verification Failed"}
            </h2>

            {!error && (
              <div className="mt-6">
                <p className="text-base font-medium opacity-90">
                  Your email has been verified. You can now login.
                </p>
                <Link 
                  to="/login" 
                  className="mt-6 inline-block w-full py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-xl font-bold"
                >
                  Go to Login
                </Link>
              </div>
            )}

            {error && (
              <p className="mt-4 text-sm text-gray-400">
                The link might be expired or invalid. Please try again.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default VerifyEmail