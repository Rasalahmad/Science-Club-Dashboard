import "./notification.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Loader from "../../components/loader/Loader";

const NotificationForm = ({ title }) => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.post("https://app.nativenotify.com/api/notification", {
      appId: 12386,
      appToken: "d8JSh7GNkeXGhsSpQoErcp",
      title: info?.title?.slice(0, 10),
      body: info?.desc?.slice(0, 100),
      dateSent: new Date(),
    });
    setLoading(false);
    Swal.fire("Success", "Notification send successfully", "success");
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

export default NotificationForm;
