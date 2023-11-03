
import { Switch, Route } from 'react-router-dom';

import About_Page from "./pages/About";
import BlogView_Page from "./pages/BlogView";
import BlogWrite_Page from "./pages/BlogWrite";
import Blog_View_User from "./pages/Blog_View_User";
import Log_In_Page from "./pages/Log_In";
import MainNavigation from './conponents/layout/MainNavigation';
import Layout from './conponents/layout/Layout';

function App() {
  return (
    <Layout>
      <Switch>
      <Route path="/" exact>
        <BlogView_Page />
      </Route>
      <Route path="/About">
        <About_Page />
      </Route>
      <Route path="/BlogWrite">
        <BlogWrite_Page />
      </Route>
      <Route path="/Blog_View_User">
        <Blog_View_User />
      </Route>
      <Route path="/Log_In">
        <Log_In_Page />
      </Route>
      </Switch>
    </Layout>
  );
}

export default App;
