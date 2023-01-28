import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, committeeRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const CommitteeDataTable = () => {
  const [data, setData] = useState(committeeRows);

  useEffect(() => {
    fetch(
      "https://science-club-app-server-production.up.railway.app/committee"
    ).then((res) => res.json());
    // .then((data) => setDatas(data));
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
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
      {!data ? (
        "Loading"
      ) : (
        <div className="datatable">
          <div className="datatableTitle">
            Add New Committee Member
            <Link to="/committee/new" className="link">
              Add New
            </Link>
          </div>
          <DataGrid
            className="datagrid"
            rows={data}
            columns={userColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        </div>
      )}
    </>
  );
};

export default CommitteeDataTable;
