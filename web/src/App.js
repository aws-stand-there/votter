import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import ResultPage from "./pages/ResultPage";
import VotePage from "./pages/VotePage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={CreatePage} />
        <Route path="/results/:id" component={ResultPage} />
        <Route path="/votes/:id" component={VotePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
