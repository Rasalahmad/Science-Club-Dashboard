import "./Modal.scss";
import CloseIcon from "../../assets/close.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const CommitteeModal = ({ show, close, item }) => {
  console.log(item);
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
              <p>{item[0]?.batch} Batch</p>
              <p>{item[0]?.about?.slice(0, 100)}</p>
              <p style={{ display: "flex", gap: "25px", marginTop: "25px" }}>
                <FacebookIcon style={{ color: "blue", cursor: "pointer" }} />
                <InstagramIcon style={{ color: "blue", cursor: "pointer" }} />
                <LinkedInIcon style={{ color: "blue", cursor: "pointer" }} />
                <TwitterIcon style={{ color: "blue", cursor: "pointer" }} />
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

export default CommitteeModal;
