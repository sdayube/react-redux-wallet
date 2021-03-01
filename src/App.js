import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition
        key={ location.key }
        classNames="fade"
        timeout={ 300 }
      >
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/carteira">
            <Wallet />
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
