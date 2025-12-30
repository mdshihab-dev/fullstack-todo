import { Route, Routes } from "react-router";
import Ragistration from "./pages/Ragistration";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CreateTodo from "./pages/CreateTodo";
import Authenticated from "./protected-routes/Authenticated";
import Unauthenticated from "./protected-routes/Unauthenticated";
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<Authenticated />}>
          <Route path="/" element={<CreateTodo />} />
        </Route>

        <Route element={<Unauthenticated />}>
          <Route path={`/reset-password/:token`} element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Ragistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
