import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import ResultPage from "./pages/ResultPage";
import VotePage from "./pages/VotePage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/create" component={CreatePage} />
        <Route path="/result/:id" component={ResultPage} />
        <Route path="/vote/:id" component={VotePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
