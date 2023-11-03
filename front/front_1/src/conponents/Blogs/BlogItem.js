import Card from "../UI/Card";
import classes from "./BlogItem.module.css";

function BlogItem(props) {
  return (
    <li className={classes.item}>
      <Card>
        {/* 這是加入圖片的代碼，如果不需要可以刪除
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        */}

        <div className={classes.content}>
          <h2>{props.title}</h2>
          <p3>{props.time}</p3>
          <br />
          <p4 className={classes.Token}>{props.token}</p4>
          <br />
          <br />
          <p5>{props.description}</p5>
          
          {/*
          
          
          <button className={classes.action}>function to</button>*/}
        </div>
      </Card>
    </li>
  );
}
export default BlogItem;
