import "./Modal.scss";
import CloseIcon from "../../assets/close.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const FacultyModal = ({ show, close, item }) => {
  return (
    <>
      {show ? (
        <div className="modalContainer" onClick={() => close()}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal_header">
              <h2 className="modal_header-title">
                {" "}
                <img
                  style={{ height: "50px", width: "50px", borderRadius: "50%" }}
                  src={`http://localhost:5000/images/${item[0].image}`}
                  alt=""
                />{" "}
                {item[0].name}
              </h2>
              <button className="close" onClick={() => close()}>
                <img src={CloseIcon} alt="close" />
              </button>
            </header>
            <main className="modal_content">
              <p>{item[0]?.designation}</p>
              <p>{item[0]?.university}</p>
              <p>{item[0]?.about}...</p>
              <p style={{ display: "flex", gap: "25px", marginTop: "25px" }}>
                <a
                  href={item[0]?.fbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon style={{ color: "blue", cursor: "pointer" }} />
                </a>
                <a
                  href={item[0]?.instraLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon style={{ color: "blue", cursor: "pointer" }} />
                </a>
                <a
                  href={item[0]?.fbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon style={{ color: "blue", cursor: "pointer" }} />
                </a>
                <a
                  href={item[0]?.fbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterIcon style={{ color: "blue", cursor: "pointer" }} />
                </a>
              </p>
            </main>
            {/* <footer className="modal_footer">
              <button className="modal-close" onClick={() => close()}>
                Cancel
              </button>

              <button className="submit">Submit</button>
            </footer> */}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FacultyModal;
