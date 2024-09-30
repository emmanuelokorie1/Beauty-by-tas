import ReactDom from "react-dom";

const Modal = ({ open, children, type }) => {
  if (open) {
    document.body.classList.add("body-active-modal");
  } else {
    document.body.classList.remove("body-active-modal");
  }

  if (!open) return null;
  return ReactDom.createPortal(
    <>{children}</>,
    document.getElementById("portal")
  );
};

export default Modal;
