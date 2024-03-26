import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Employees from "./pages/Employee";
import Employee from "./pages/Employee/_id";
import AddEmployee from "./pages/Employee/add";
import EditEmployee from "./pages/Employee/edit";
import Departments from "./pages/Department";
import Department from "./pages/Department/_id";
import AddDepartment from "./pages/Department/add";
import Faculties from "./pages/Faculty";
import AddFaculty from "./pages/Faculty/add";
import Faculty from "./pages/Faculty/_id";
import Work from "./pages/work";
import AddWork from "./pages/work/add";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import EditWork from "./pages/work/edit";
import Rest from "./pages/rest";
import AddRest from "./pages/rest/add";
import EditRest from "./pages/rest/edit";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      navigate("/login");
    }
    if (window.location.pathname === "/") {
      navigate("/nhan-vien");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Sidebar />}>
        {/* employee */}
        <Route path="/nhan-vien" element={<Employees />} />
        <Route path="/nhan-vien/them" element={<AddEmployee />} />
        <Route path="/nhan-vien/chi-tiet/:id" element={<Employee />} />
        <Route path="/nhan-vien/sua/:id" element={<EditEmployee />} />
        {/* ------------------------------------------------------- */}
        {/* department */}
        <Route path="/phong-ban" element={<Departments />} />
        <Route path="/phong-ban/them" element={<AddDepartment />} />
        <Route path="/phong-ban/chi-tiet/:id" element={<Department />} />
        {/* ------------------------------------------------------- */}
        {/* faculty */}
        <Route path="/khoa" element={<Faculties />} />
        <Route path="/khoa/them" element={<AddFaculty />} />
        <Route path="/khoa/chi-tiet/:id" element={<Faculty />} />
        {/* ------------------------------------------------------- */}
        {/* work */}
        <Route path="/cong-tac" element={<Work />} />
        <Route path="/cong-tac/them" element={<AddWork />} />
        <Route path="/cong-tac/sua/:id" element={<EditWork />} />
        {/* ------------------------------------------------------- */}
        {/* rest */}
        <Route path="/nghi-phep" element={<Rest />} />
        <Route path="/nghi-phep/them" element={<AddRest />} />
        <Route path="/nghi-phep/sua/:id" element={<EditRest />} />
        {/* ------------------------------------------------------- */}
      </Route>
    </Routes>
  );
}

export default App;
