import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { makeRequest } from "../../axios";
import Modal from "../modal/Modal";
import Loader from "../loader/Loader";

const NoticeDataTable = () => {
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
        const res = await makeRequest.get("/notice");
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
          makeRequest.delete(`/notice/${id}`);
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

  const noticeColumns = [
    {
      field: "_id",
      headerName: "Notice ID",
      width: 200,
    },
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    {
      field: "desc",
      headerName: "Description",
      width: 200,
      renderCell: (params) => {
        return <div>{params.row.desc?.slice(0, 25)}</div>;
      },
    },
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
          Notice List
          <Link to={`notices/add-notice`} className="link">
            Add Notice
          </Link>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <DataGrid
            className="datagrid"
            rows={data}
            columns={noticeColumns}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            getRowId={(rows) => rows._id}
          />
        )}
        {error && <p>{error}</p>}
      </div>
      <Modal show={modal} close={Toggle} item={item} heading={"Notice"} />
    </>
  );
};

export default NoticeDataTable;
