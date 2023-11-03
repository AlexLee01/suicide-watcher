import BlogList from "../conponents/Blogs/BlogList";
import { useState, useEffect } from "react";
import classes from './Blog_View.module.css';

function BlogView_Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://suiside-dbs-default-rtdb.firebaseio.com/Blogs.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const blogData = [];
        for (const key in data) {
          const blog = {
            id: key,
            ...data[key]
          };
          blogData.push(blog);
        }
        // 对博客数据按照时间进行降序排序
        const sortedBlogs = blogData.sort((a, b) => new Date(b.time) - new Date(a.time));
        setIsLoading(false);
        setLoadedBlogs(sortedBlogs);
      });
  }, []); // 添加空依赖项以避免多次触发副作用

  if (isLoading) {
    return (
      <section>
        <div className={classes.rectangle1}></div>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
    
      <BlogList blogs={loadedBlogs} />
      <div className={classes.rectangle1}></div>

    </section>
  );
}

export default BlogView_Page;