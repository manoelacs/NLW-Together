import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NewRoom } from './pages/NewRoom';
import { Home } from './pages/Home';
import { AuthContextProvider } from '../src/contexts/AuthContext';
import * as routes from './routes/paths';
import Room from './pages/Room';


function App() { 

  return (
    <BrowserRouter> 
      <Switch>
        <AuthContextProvider>
            <Route path={routes.HOME} exact component={Home} />
            <Route path={routes.NEWROOM} component={NewRoom} /> 
            <Route path={routes.ROOM} component={Room} />        
          </AuthContextProvider>  
      </Switch>               
    </BrowserRouter>
  );
}; export default App;
