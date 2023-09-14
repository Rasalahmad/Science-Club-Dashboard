import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { courseColumn, userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { makeRequest } from "../../axios";

const CourseDataTable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
          setData(res.data.data);
        }
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [department, semester]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          makeRequest.delete(`/faculty/${id}`);
          setData(data.filter((item) => item._id !== id));
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } catch (err) {
          setError(err);
        }
      }
    });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/notice/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
      {!data || loading ? (
        "Loading"
      ) : (
        <div className="datatable">
          <div className="datatableTitle">Course List</div>
          <div style={{ display: "flex", gap: "50px" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
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
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
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
          {data.length > 0 && (
            <DataGrid
              className="datagrid"
              rows={data}
              columns={courseColumn.concat(actionColumn)}
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

export default CourseDataTable;
