import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import CommitteeForm from "./pages/new/CommitteeForm";
import FacultyForm from "./pages/new/FacultyForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { committeeInputs, facultyInputs, resultInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import ResultForm from "./pages/new/ResultForm";
import CourseForm from "./pages/new/CourseForm";

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
                    title="Add New Committee Member"
                  />
                }
              />
            </Route>
            <Route path="notices">
              <Route index element={<List />} />
              <Route path=":noticeId" element={<Single />} />
              <Route
                path="noticeForm"
                // ! have to change
                element={
                  <CommitteeForm
                    inputs={committeeInputs}
                    title="Add New Member"
                  />
                }
              />
            </Route>
            <Route path="events">
              <Route index element={<List />} />
              <Route path=":noticeId" element={<Single />} />
              <Route
                path="noticeForm"
                // ! have to change
                element={
                  <CommitteeForm
                    inputs={committeeInputs}
                    title="Add New Member"
                  />
                }
              />
            </Route>
            <Route path="journals">
              <Route index element={<List />} />
              <Route path=":noticeId" element={<Single />} />
              <Route
                path="noticeForm"
                // ! have to change
                element={
                  <CommitteeForm
                    inputs={committeeInputs}
                    title="Add New Member"
                  />
                }
              />
            </Route>
            <Route
              path="add-result"
              element={<ResultForm inputs={resultInputs} title="Add Result" />}
            />
            <Route
              path="add-course"
              element={<CourseForm inputs={resultInputs} title="Add Course" />}
            />
            <Route path="courses">
              <Route index element={<List />} />
              <Route path=":noticeId" element={<Single />} />
            </Route>
            <Route path="result">
              <Route index element={<List />} />
              <Route path=":noticeId" element={<Single />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
