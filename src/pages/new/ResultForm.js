import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { makeRequest } from "../../axios";
import Swal from "sweetalert2";

const ResultForm = ({ inputs, title }) => {
  const [info, setInfo] = useState({});
  const [courses, setCourses] = useState([
    { courseName: "", courseId: "", marks: "" },
  ]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedCourses = [...courses];
    updatedCourses[index] = { ...updatedCourses[index], [name]: value };
    setCourses(updatedCourses);
  };

  const handleAddCourse = () => {
    setCourses([...courses, { courseName: "", courseId: "", marks: "" }]);
  };

  const handleRemoveCourse = (index) => {
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
  };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ ...info, courses });
    // const data = { ...info };
    // const res = await makeRequest.post("/faculty", data);
    // if (res.data) {
    //   Swal.fire(
    //     "Success",
    //     "The Committee Member Added successfully",
    //     "success"
    //   );
    // } else {
    //   Swal.fire("Error", "Something went wrong", "error");
    // }
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
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === "select" ? (
                    <select
                      id={input.id}
                      onChange={handleChange}
                      value={input.value} // If you want to control the selected value
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
              {courses.map((course, index) => (
                <div key={index} className="formInput">
                  <label>Course Name</label>
                  <input
                    type="text"
                    name="courseName"
                    value={course.courseName}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Course Name"
                  />
                  <label>Course ID</label>
                  <input
                    type="text"
                    name="courseId"
                    value={course.courseId}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Course ID"
                  />
                  <label>Marks</label>
                  <input
                    type="text"
                    name="marks"
                    value={course.marks}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Marks"
                  />
                  {index === courses.length - 1 && (
                    <button className="add-button" onClick={handleAddCourse}>
                      Add Course
                    </button>
                  )}
                  {index !== courses.length - 1 && (
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveCourse(index)}
                    >
                      Remove Course
                    </button>
                  )}
                </div>
              ))}
              <button onClick={handleSubmit}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultForm;
