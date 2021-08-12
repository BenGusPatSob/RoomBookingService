import React from 'react'
import Header from './Header'
import './App.css';
import './firebase/config';

import CreateRoom from './pages/CreateRoom';
import GetRoom from './pages/GetRoom';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import { RoomProvider } from './firebase/RoomProvider';
import Room from './pages/UpdateDeleteRoom';
import RoomRedirect from './router/RoomRedirect';
import RoomRedirectPrivate from './router/RoomRedirectPrivate';

function App() {
  return (
    <RoomProvider>
      <BrowserRouter>
            <Header></Header>
            <div className="app">
              <div className="ui grid container">
                <Switch>
{/* 
                  <Route exact path="/createRoom" component={CreateRoom}/>
                  <Route exact path="/getRoom" component={GetRoom}/>
                  <Route exact path="/room/:id" component={Room} /> */}
                  <RoomRedirect exact path="/createRoom" component={CreateRoom}/>
                  <RoomRedirect exact path="/getRoom" component={GetRoom}/>
                  <RoomRedirectPrivate exact path="/room/:id" component={Room} />
                  <Route exact path="/">
                    <Redirect to="/getRoom" />
                  </Route>
                </Switch>
              </div>
            </div>
      </BrowserRouter>
    </RoomProvider>
  );
}
export default App;
