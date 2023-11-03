import classes from "./BackGround.module.css";

function BG(props) {
  return <div className={classes.Background}>{props.children}</div>;
}

export default BG;
