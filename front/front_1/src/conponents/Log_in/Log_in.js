import { useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "./Log_in.module.css";
import MainNavigation from "../layout/MainNavigation";
import Blog_View_User from "../../pages/Blog_View_User";
import BlogView from "../../pages/BlogView";

function Log_in() {
  const history = useHistory();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn_user, setIsLoggedIn_user] = useState(false);
  const [isLoggedIn_admin, setIsLoggedIn_admin] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    // 在此处可以添加验证逻辑，例如向服务器发送验证请求
    // 根据验证结果设置 isLoggedIn 状态
    if (username === "user" ) {
      setIsLoggedIn_user(true);
    } else if (username === "admin") {
      setIsLoggedIn_admin(true);
    }

   
  };

  const Continue = () => {
    if (isLoggedIn_user) {
      history.push("/blog_view_user");
      setIsLoggedIn_user(false);
      setIsLoggedIn_admin(false);
      setUsername("");
      setPassword("");

    }
    if (isLoggedIn_admin) {
      history.push("/");
      setIsLoggedIn_user(false);
      setIsLoggedIn_admin(false);
      setUsername("");
      setPassword("");
    }

  };

  const handleSignup = () => {
    // 处理注册逻辑
    console.log("Sign up clicked");
  };

  if (isLoggedIn_user) {
    return (
      <div>
        <h1 className={classes.notice}>Welcome  {username}!</h1>
        <button className={classes.Continue}onClick={Continue}>Continue</button>
      </div>
    );
  }
  
  if (isLoggedIn_admin) {
    return (
      <div>
        <h1 className={classes.notice}>This is a nice day. Have a good work {username}!</h1>
        <button className={classes.Continue}onClick={Continue}>Continue</button>
      </div>
    );
  }

  return (
    <div className={classes.background}>
      <div className={classes.card}>
        <form className={classes.form} onSubmit={handleLogin}>
          <h1>Login</h1>
          <label>
            Username:
            <input type="text" value={username} onChange={handleUsernameChange} />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <br />
          <button type="submit">Login</button>
          <button onClick={handleSignup}>Sign up</button>
        </form>
      </div>
    </div>
  );
  }

export default Log_in;
