import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { makeRequest } from "../../axios";
import { resultColumn } from "../../datatablesource";

const ResultDataTabe = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [stdId, setStdId] = useState("");
  const [loading, setLoading] = useState(false);

  const [department, setDepartment] = useState("");

  const handleDropdownChange = (event) => {
    setDepartment(event.target.value);
  };
  const [semester, setSemester] = useState("");

  const handleSemester = (event) => {
    setSemester(event.target.value);
  };
  const [examType, setExamType] = useState("");

  const handleAssesment = (event) => {
    setExamType(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (
          semester &&
          semester !== "Choose semester" &&
          department &&
          department !== "Choose department" &&
          stdId.length >= 8
        ) {
          const res = await makeRequest.get(
            `/result/${department.toLocaleLowerCase()}/?stdId=${stdId}&semester=${semester}&examType=${examType}`
          );
          setData(res.data.data);
        }
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [department, examType, semester, stdId]);

  // const handleDelete = (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         makeRequest.delete(`/faculty/${id}`);
  //         setData(data.filter((item) => item._id !== id));
  //         Swal.fire("Deleted!", "Your file has been deleted.", "success");
  //       } catch (err) {
  //         setError(err);
  //       }
  //     }
  //   });
  // };
  // const actionColumn = [
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     width: 200,
  //     renderCell: (params) => {
  //       return (
  //         <div className="cellAction">
  //           <Link to="/notice/test" style={{ textDecoration: "none" }}>
  //             <div className="viewButton">View</div>
  //           </Link>
  //           <div
  //             className="deleteButton"
  //             onClick={() => handleDelete(params.row._id)}
  //           >
  //             Delete
  //           </div>
  //         </div>
  //       );
  //     },
  //   },
  // ];

  console.log(data, "data");
  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <div className="datatable">
          <div className="datatableTitle">
            Result {data?.stdName && `of ${data?.stdName}`}
          </div>
          <div style={{ display: "flex", gap: "50px" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <div>
                <label>Student ID</label>
                <input
                  type="text"
                  placeholder="Student Id"
                  onChange={(e) => setStdId(e.target.value)}
                  style={{
                    width: "300px",
                    border: "none",
                    borderBottom: "1px solid gray",
                    padding: " 5px",
                    fontSize: "16px",
                    margin: "0 0 30px 0",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "0 5px",
                  }}
                  htmlFor="dropdown"
                >
                  Select department
                </label>
                <select
                  id="dropdown"
                  style={{
                    width: "300px",
                    border: "none",
                    borderBottom: "1px solid gray",
                    padding: " 5px",
                    fontSize: "16px",
                    margin: "0 0 30px 0",
                    outline: "none",
                  }}
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
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "0 5px",
                  }}
                  htmlFor="dropdown"
                >
                  Assesment
                </label>
                <select
                  id="dropdown"
                  style={{
                    width: "300px",
                    border: "none",
                    borderBottom: "1px solid gray",
                    padding: " 5px",
                    fontSize: "16px",
                    margin: "0 0 30px 0",
                    outline: "none",
                  }}
                  value={examType}
                  onChange={handleAssesment}
                >
                  <option>Choose Assesment</option>
                  <option>Mid-term</option>
                  <option>Final-term</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "0 5px",
                  }}
                  htmlFor="dropdown"
                >
                  Select Semester
                </label>
                <select
                  id="dropdown"
                  style={{
                    width: "300px",
                    border: "none",
                    borderBottom: "1px solid gray",
                    padding: " 5px",
                    fontSize: "16px",
                    margin: "0 0 30px 0",
                    outline: "none",
                  }}
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
            </div>
          </div>
          {data?.courses && (
            <DataGrid
              className="datagrid"
              rows={data?.courses}
              columns={resultColumn}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
              getRowId={(rows) => rows._id}
            />
          )}
          {error && <p>{error}</p>}
        </div>
      )}
    </>
  );
};

export default ResultDataTabe;
