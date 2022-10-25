import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Landing from "./components/landing page/landing";
import Home from "./components/Home/home";
import DogDetail from "./components/DogDetails/DogDetail";
import DogCreated from "./components/DogCreated/DogCreated";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Landing/>
          </Route>
          <Route exact path="/home">
            <Home/>
          </Route>
          <Route exact path="/dog-detail/:id">
            <DogDetail />
          </Route>
          <Route exact path="/dog">
            <DogCreated/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
