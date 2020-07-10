import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom"
import asyncComponent from "./util/asyncComponent"
const Index = asyncComponent(() => import("./pages/index/index"))
const Detail = asyncComponent(() => import("./pages/detail/detail"))
const Collection = asyncComponent(() => import("./pages/collection/collection"))
const Comment = asyncComponent(() => import("./pages/comment/comment"))
function App() {
  return (
    <div>
      {
        <Switch>
          <Route path="/index" component={Index}></Route>
          <Route path="/collection" component={Collection}></Route>
          <Route path="/detail/:id" component={Detail}></Route>
          <Route path="/comments/:id" component={Comment}></Route>
          <Redirect to="/index"></Redirect>
        </Switch>
      }
    </div>
  );
}

export default App;
