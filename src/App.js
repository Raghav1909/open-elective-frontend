import LoginPage from "./pages/LoginPage/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutesStaff from "./utils/PrivateRoutesStaff";
import PrivateRoutesStudent from "./utils/PrivateRoutesStudent";
import PrivateRoutes from "./utils/PrivateRoutes";
import StudentPage from "./pages/StudentPage/StudentPage";
import StaffPage from "./pages/StaffPage/StaffPage";
import ElectivePage from "./pages/ElectivePage/ElectivePage";

function App() {
  let user = JSON.parse(localStorage.getItem('user'))

  return (
    <div>
      <Routes>
        <Route path="/" element={!user ? <LoginPage /> : <Navigate to ={user.isStaff ? '/staff/' : '/student/'} replace = {true}/>} />
        <Route element = {<PrivateRoutesStaff/>}>
          <Route path = "/staff/*" element = {<StaffPage/>}/>
        </Route>
        <Route element = {<PrivateRoutesStudent/>}>
          <Route path = "/student/*" element = {<StudentPage/>}/>
        </Route>
        <Route element = {<PrivateRoutes/>}>
          <Route path = "/elective/:electiveName/*" element = {<ElectivePage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
