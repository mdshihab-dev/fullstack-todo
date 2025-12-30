import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

const Authenticated = () => {
    let {accessToken} = useSelector(state => state.auth)
  return accessToken ? <Outlet/> : <Navigate to="/login"/>
}

export default Authenticated