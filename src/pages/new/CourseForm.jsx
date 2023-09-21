import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { makeRequest } from "../../axios";
import Swal from "sweetalert2";

const CourseForm = ({ inputs, title }) => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const [department, setDepartment] = useState("");

  const handleDropdownChange = (event) => {
    setDepartment(event.target.value);
  };
  const [semester, setSemester] = useState("");

  const handleSemester = (event) => {
    setSemester(event.target.value);
  };
  const [credit, setCredit] = useState("");

  const handleCredit = (event) => {
    setCredit(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      ...info,
      department,
      semester,
      credit: credit ? Number(credit) : 3,
    };
    const res = await makeRequest.post(`/course`, data);
    if (res.data) {
      setLoading(false);
      setInfo({});
      Swal.fire("Success", "Course Added successfully", "success");
    } else {
      setLoading(false);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <div style={{ display: "flex", gap: "50px" }}>
              <div>
                <label className="label" htmlFor="dropdown">
                  Select department
                </label>
                <select
                  id="dropdown"
                  className="department"
                  value={department}
                  onChange={handleDropdownChange}
                >
                  <option>Choose department</option>
                  <option>CSE</option>
                  <option>BBA</option>
                  <option>ENGLISH</option>
                  <option>GDS</option>
                  <option>HTM</option>
                  <option>MBA</option>
                </select>
              </div>
              <div>
                <label className="label" htmlFor="dropdown">
                  Select Semester
                </label>
                <select
                  id="dropdown"
                  className="department"
                  value={semester}
                  onChange={handleSemester}
                >
                  <option>Choose semester</option>
                  <option>1st</option>
                  <option>2nd</option>
                  <option>3rd</option>
                  <option>4th</option>
                  <option>5th</option>
                  <option>6th</option>
                  <option>7th</option>
                  <option>8th</option>
                </select>
              </div>
              <div>
                <label className="label" htmlFor="dropdown">
                  Credit
                </label>
                <select
                  id="dropdown"
                  className="department"
                  value={credit}
                  onChange={handleCredit}
                >
                  <option>3</option>
                  <option>1.5</option>
                </select>
              </div>
            </div>
            <form>
              <div
                className="formInput"
                style={{ display: "flex", gap: "50px" }}
              >
                <div style={{ width: "100%" }}>
                  <label>Course Name</label>
                  <input
                    type="text"
                    placeholder="course name"
                    id="name"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Course Code</label>
                  <input
                    type="text"
                    placeholder="course code"
                    id="course_id"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
            <button onClick={handleSubmit}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
