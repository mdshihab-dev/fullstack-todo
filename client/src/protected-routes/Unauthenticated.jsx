import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
const Unauthenticated = () => {
  let {accessToken} = useSelector(state => state.auth)
  return !accessToken ? <Outlet/> : <Navigate to="/"/>
}

export default Unauthenticated