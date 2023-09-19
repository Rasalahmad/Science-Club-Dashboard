import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useRef, useState } from "react";
import { makeRequest } from "../../axios";
import { resultColumn } from "../../datatablesource";
import ReactToPrint from "react-to-print";
import { ComponentToPrint } from "../marksheet/Marksheet";
import { calculation } from "../../utils";

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

  const totalCredit = data?.courses?.reduce(
    (sum, course) => sum + course.credit,
    0
  );

  const totalCgpa = data?.courses?.reduce((sum, course) => {
    const gp = calculation(
      (Number(course.marks) / data?.examType === "Mid-term" ? 30 : 100) * 100
    );
    const qp = gp * course.credit;
    return sum + qp;
  }, 0);

  const cgpa = totalCgpa / totalCredit;

  const actionColumn = [
    {
      field: "point",
      headerName: "Point",
      width: 200,
      renderCell: (params) => {
        const percentage =
          (Number(params.row.marks) /
            (data?.examType === "Mid-term" ? 30 : 100)) *
          100;
        return <div>{calculation(percentage)}</div>;
      },
    },
    {
      field: "grade",
      width: 200,
      renderCell: (params) => {
        console.log(params);
        const percentage =
          (Number(params.row.marks) /
            (data?.examType === "Mid-term" ? 30 : 100)) *
          100;
        return <div>{calculation(percentage, true)}</div>;
      },
    },
  ];

  const componentRef = useRef();

  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <div className="datatable">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="datatableTitle">
              Result {data?.stdName && `of ${data?.stdName}`} ({data?.stdId}){" "}
              <br />
              {data?.stdName &&
                `CGPA :
            ${cgpa.toFixed(2)}`}
            </div>
            {data?.stdName && (
              <div>
                <ReactToPrint
                  trigger={() => (
                    <button
                      style={{
                        width: "max-content",
                        border: "none",
                        outline: "none",
                        padding: "10px 15px",
                        fontSize: "16px",
                        background: "#aaaaff",
                        borderRadius: "7px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Print this out!
                    </button>
                  )}
                  content={() => componentRef.current}
                />
                <div style={{ display: "none" }}>
                  <ComponentToPrint
                    ref={componentRef}
                    data={data}
                    department={department}
                    cgpa={cgpa}
                  />
                </div>
              </div>
            )}
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
              columns={resultColumn.concat(actionColumn)}
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
