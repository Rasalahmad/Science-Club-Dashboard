import React from "react";
import { calculation } from "../../utils";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { stdName, examType, stdId, semester, courses } = props?.data || {};
  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "100px",
    backgroundColor: "#fff",
    borderRadius: "5px",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "30px",
  };

  const logoStyle = {
    height: "100px",
    marginBottom: "10px",
  };

  const titleStyle = {
    fontSize: "24px",
    margin: "0",
  };

  const studentInfoStyle = {
    textAlign: "center",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const tableHeaderStyle = {
    padding: "10px",
    textAlign: "left",
    border: "1px solid black",
  };

  const tableCellStyle = {
    padding: "10px",
    textAlign: "left",
    border: "1px solid black",
  };

  return (
    <div ref={ref}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <img
            src="https://www.bubban.edu.bd/assets/image/bubban_logo.jpg"
            alt="University Logo"
            style={logoStyle}
          />
          <h1 style={titleStyle}>BANDARBAN UNIVERSITY</h1>
        </div>
        <div style={studentInfoStyle}>
          <div style={{ textAlign: "center", margin: "30px 0" }}>
            <p>Student Name: {stdName}</p>
            <p>Student ID: {stdId}</p>
            <p>Department: {props?.department}</p>
            <p>Assessment: {examType}</p>
            <p>Semester: {semester}</p>
            <p>CGPA: {props?.cgpa} (A+)</p>
          </div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Course Code</th>
                <th style={tableHeaderStyle}>Subject</th>
                <th style={tableHeaderStyle}>Point</th>
                <th style={tableHeaderStyle}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr>
                  <td style={tableCellStyle}>{c.course_id}</td>
                  <td style={tableCellStyle}>{c.name}</td>
                  <td style={tableCellStyle}>
                    {calculation(
                      (c.marks / (examType === "Mid-term" ? 30 : 100)) * 100
                    )}
                  </td>
                  <td style={tableCellStyle}>
                    {" "}
                    {calculation(
                      (Number(c.marks) / (examType === "Mid-term" ? 30 : 100)) *
                        100,
                      true
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});
