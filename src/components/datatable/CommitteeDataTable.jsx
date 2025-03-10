import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { makeRequest } from "../../axios";
import CommitteeModal from "../modal/CommitteeModal";
import Loader from "../loader/Loader";

const CommitteeDataTable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState({});
  const Toggle = () => setModal(!modal);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await makeRequest.get("/committee");
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
          makeRequest.delete(`/committee/${id}`);
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
              className="viewButton"
              onClick={() => handleSingleItem(params.row._id)}
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
          Committee Members
          <Link to={`/committee/committeeForm`} className="link">
            Add New
          </Link>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <DataGrid
            className="datagrid"
            rows={data}
            columns={userColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            getRowId={(rows) => rows._id}
          />
        )}
        {error && <p>{error}</p>}
      </div>
      <CommitteeModal show={modal} close={Toggle} item={item} />
    </>
  );
};

export default CommitteeDataTable;
