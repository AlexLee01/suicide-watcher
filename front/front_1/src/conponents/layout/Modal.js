import classes from "./Modal.module.css";
function Modal() {
  return (
    <div className={classes.modal}>
      <p className={classes.title}>Published successfully!</p>
      <br />
      <p>I'm really sorry to hear that you're feeling this way. It's important to reach out to someone you trust for support. </p>
     
      <p> You can contact the HK Suicide Prevention Lifeline: 2382000. </p>
    </div>
  );
}

export default Modal;
