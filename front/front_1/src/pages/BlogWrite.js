import BlogCreate from "../conponents/Blogs/BlogCreate";
import { useHistory } from "react-router-dom";
import classes from './Blog_create.module.css'

function BlogWrite_Page() {
  const history = useHistory();
  function addBlogHandler(BlogData) {
    fetch("https://suiside-dbs-default-rtdb.firebaseio.com/Blogs.json", {
      method: "POST",
      body: JSON.stringify(BlogData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setTimeout(() => {
        history.replace("/Blog_View_User");
      }, 2000);
    });
  }
  return (
    <section>
      <BlogCreate onAddBlog={addBlogHandler} />
      <div className={classes.rectangle2}></div>
    </section>
  );
}

export default BlogWrite_Page;
