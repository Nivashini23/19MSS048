import { Switch } from "react-router-dom";
import { Route } from "routes";
import { Trains } from 'pages';

function App() {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/trains"
          component={Trains}
        />
      </Switch>
    </>
  );
}

export default App;