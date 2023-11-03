import BlogItem from "./BlogItem";
import classes from "./BlogList.module.css";

function BlogList(props) {
  return (
    <ul className={classes.list}>
      {props.blogs.map((blog) => (
        <BlogItem
          key={blog.id}
          id={blog.id}
          //image={blog.image}
          title={blog.title}
          time={blog.time}
          token={blog.token}
          description={blog.description}
        />
      ))}
    </ul>
  );
}

export default BlogList;
