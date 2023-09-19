import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { makeRequest } from "../../axios";
import Modal from "../modal/Modal";

const EventDataTable = () => {
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
        const res = await makeRequest.get("/event");
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
          makeRequest.delete(`/event/${id}`);
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

  const eventColumn = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "title",
      headerName: "Title",
      width: 350,
    },

    {
      field: "desc",
      headerName: "Description",
      width: 200,
      renderCell: (params) => {
        <div>{params.row.desc.slice(0, 20)}</div>;
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
      {!data || loading ? (
        "Loading"
      ) : (
        <div className="datatable">
          <div className="datatableTitle">
            Event List
            <Link to={`/events/add-event`} className="link">
              Add Event
            </Link>
          </div>
          <DataGrid
            className="datagrid"
            rows={data}
            columns={eventColumn}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            getRowId={(rows) => rows._id}
          />
          {error && <p>{error}</p>}
        </div>
      )}
      <Modal show={modal} close={Toggle} item={item} heading={"Notice"} />
    </>
  );
};

export default EventDataTable;
