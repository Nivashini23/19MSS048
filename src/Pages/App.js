import { Switch } from "react-router-dom";
import { Route } from "routes";
import { Train, Trains } from 'Pages';

function App() {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          component={Trains}
        />
        <Route
          exact
          path="/trains"
          component={Trains}
        />
        <Route
          exact
          path="/train/:id"
          component={Train}
        />
      </Switch>
    </>
  );
}

export default App;