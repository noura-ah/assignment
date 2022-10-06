import logo from './logo.svg';
import './App.css';
import Users from './components/user/Users';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Navbar from './components/Navbar';
import NewUser from './components/user/NewUser';
import UpdateUser from './components/user/UpdateUser';
import ShowUser from './components/user/ShowUser'
import LoginAdmin from './components/LoginAdmin'
import Tests from './components/quiz/Tests';
import NewTest from './components/quiz/NewTest';
import UpdateTest from './components/quiz/UpdateTest';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <LoginAdmin />
          </Route>

          {/* users routes */}
          <Route exact path="/users">
            <Users />
          </Route>
          {/* <Route exact path="/users" render={() => (
            loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Users />
            )
          )}>
            {/* <Users /> 
          </Route> */}
          <Route path="/users/new">
            <NewUser />
          </Route>
          <Route exact path="/users/:id">
            <ShowUser />
          </Route>
          <Route path="/users/:id/edit">
            <UpdateUser />
          </Route>
            
          {/* tests routes */}
          <Route exact path="/tests">
            <Tests />
          </Route>
          <Route path="/tests/new">
            <NewTest />
          </Route>
          <Route path="/tests/:id/edit">
            <UpdateTest />
          </Route>
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
