import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import Swal from "sweetalert2";

const ResultForm = ({ inputs, title }) => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedCourses = [...courses];
    updatedCourses[index] = { ...updatedCourses[index], [name]: value };
    setCourses(updatedCourses);
  };
  console.log(courses);
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (
          semester &&
          semester !== "Choose semester" &&
          department &&
          department !== "Choose department"
        ) {
          const res = await makeRequest.get(
            `/course/?semester=${semester}&department=${department}`
          );
          setCourses(res.data.data);
        }
      } catch (err) {
        // setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [department, semester]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...info, courses, semester };
    console.log(data);
    const res = await makeRequest.post(
      `/result/${department.toLocaleLowerCase()}`,
      data
    );
    if (res.data) {
      Swal.fire("Success", "Result Added successfully", "success");
    } else {
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
            <label className="label" htmlFor="dropdown">
              Select Semester
            </label>
            <select
              id="dropdown"
              className="department"
              value={semester}
              onChange={handleSemester}
            >
              <option>Choose department</option>
              <option>1st</option>
              <option>2nd</option>
              <option>3rd</option>
              <option>4th</option>
              <option>5th</option>
              <option>6th</option>
              <option>7th</option>
              <option>8th</option>
            </select>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <form>
                {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    {input.type === "select" ? (
                      <select
                        id={input.id}
                        onChange={handleChange}
                        value={input.value}
                      >
                        <option value="">{input.placeholder}</option>
                        {input.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={input.type}
                        id={input.id}
                        placeholder={input.placeholder}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                ))}
                {courses.length > 0 && (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      // justifyContent: "space-between",
                      flexDirection: "column",
                      gap: "25px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "100px" }}>
                      <label style={{ width: "40%" }}>Course Name</label>
                      <label>Marks</label>
                    </div>

                    {courses.map((course, index) => (
                      <div
                        key={index}
                        className="formInput"
                        style={{
                          width: "100%",
                          display: "flex",
                          gap: "100px",
                        }}
                      >
                        <div style={{ width: "40%" }}>
                          <input
                            type="text"
                            name="courseName"
                            value={course.name}
                            onChange={(e) => handleInputChange(index, e)}
                            placeholder="Course Name"
                          />
                        </div>
                        {/* <div>
                      <label>Course ID</label>
                      <input
                        type="text"
                        name="courseId"
                        value={course?.course_id}
                        onChange={(e) => handleInputChange(index, e)}
                        placeholder="Course ID"
                      />
                    </div>
                    <div>
                      <label>Credit Hours</label>
                      <input
                        type="text"
                        name="creditHours"
                        value={course.credit}
                        onChange={(e) => handleInputChange(index, e)}
                        placeholder="Credit Hours"
                      />
                    </div> */}
                        <div>
                          <input
                            type="text"
                            name="marks"
                            value={course.marks}
                            onChange={(e) => handleInputChange(index, e)}
                            placeholder="Marks"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </form>
            )}
            <div className="btnContainer">
              <button onClick={handleSubmit}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultForm;
