import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { facultyColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { makeRequest } from "../../axios";
import FacultyModal from "../modal/FacultyModal";
import Loader from "../loader/Loader";

const FacultyDataTable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState([]);
  const Toggle = () => setModal(!modal);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await makeRequest.get("/faculty");
        setData(res.data.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

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

  const handleSingleItem = (id) => {
    setItem(data?.filter((item) => item._id === id));
    Toggle();
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              onClick={() => handleSingleItem(params.row._id)}
              className="viewButton"
            >
              View
            </div>
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
      <div className="datatable">
        <div className="datatableTitle">
          Faculty Members
          <Link to={`/faculty/facultyForm`} className="link">
            Add New
          </Link>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <DataGrid
            className="datagrid"
            rows={data}
            columns={facultyColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            getRowId={(rows) => rows._id}
          />
        )}
        {error && <p>{error}</p>}
      </div>
      <FacultyModal show={modal} close={Toggle} item={item} />
    </>
  );
};

export default FacultyDataTable;
