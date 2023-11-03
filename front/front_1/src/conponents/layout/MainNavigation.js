import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation(isLoggedIn_user, isLoggedIn_admin) {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Suiside Watcher</div>
      <nav>
        <ul className={classes.navigation}>
          <li>
            {isLoggedIn_admin && (
              <li>
                <Link to="/">Blog Detect</Link>
              </li>
            )}
            <li>
              <Link to="/About">About</Link>
            </li>

          </li>

          <li>
            {isLoggedIn_admin && (
              <li>
                <Link to="/Blog_View_User">Community</Link>
              </li>
            )}
            <li>
              <Link to="/Log_In">LogIN</Link>
            </li>
            <li>
              <Link to="/BlogWrite">Add Blogs</Link>
            </li>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
