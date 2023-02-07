import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import CommitteeForm from "./pages/new/CommitteeForm";
import FacultyForm from "./pages/new/FacultyForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { committeeInputs, facultyInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="faculty">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="facultyForm"
                element={
                  <FacultyForm inputs={facultyInputs} title="Add New Faculty" />
                }
              />
            </Route>
            <Route path="committee">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="committeeForm"
                element={
                  <CommitteeForm
                    inputs={committeeInputs}
                    title="Add New Member"
                  />
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
