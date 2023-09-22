import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { makeRequest } from "../../axios";
import Swal from "sweetalert2";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import Loader from "../../components/loader/Loader";

const EventForm = ({ title }) => {
  const [info, setInfo] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      ...info,
      ...(file && file),
    };
    const res = await makeRequest.post(`/event`, data);
    if (res.data) {
      await axios.post("https://app.nativenotify.com/api/notification", {
        appId: 12386,
        appToken: "d8JSh7GNkeXGhsSpQoErcp",
        title: info?.title,
        body: info?.desc,
        dateSent: new Date(),
      });
      setLoading(false);
      Swal.fire("Success", "Course Added successfully", "success");
    } else {
      setLoading(false);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="bottom">
            <div className="left">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>
            <div className="right">
              <form>
                <div
                  className="formInput"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "50px",
                  }}
                >
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                  <div style={{ width: "100%" }}>
                    <label>Title</label>
                    <input
                      type="text"
                      placeholder="Title"
                      id="title"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Description</label>
                    <textarea
                      placeholder="Description"
                      id="desc"
                      style={{ width: "400px", height: "200px" }}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </form>
              <div style={{ marginBottom: "25px" }}>
                <button onClick={handleSubmit}>Send</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventForm;
