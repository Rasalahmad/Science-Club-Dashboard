import "./Modal.scss";
import CloseIcon from "../../assets/close.png";
import moment from "moment";

const Modal = ({ show, close, item, heading }) => {
  console.log(item);
  const { title, desc, createdAt } = item[0] || [];
  const content = (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <p>
        <b>Title</b> <br /> {title}
      </p>
      <p>
        <b>Description</b> <br />
        {desc?.slice(0, 400)}
      </p>
      <p>
        <b>Date</b> <br />
        {moment(createdAt).format("MMM Do YY")}
      </p>
    </div>
  );

  return (
    <>
      {show ? (
        <div className="modalContainer" onClick={() => close()}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal_header">
              <h2 className="modal_header-title">{heading}</h2>
              <button className="close" onClick={() => close()}>
                <img src={CloseIcon} alt="close" />
              </button>
            </header>
            <main className="modal_content">{content}</main>
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

export default Modal;
