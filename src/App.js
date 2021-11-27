import './App.css';
import Areas from './pages/areas/areas';
import England from './pages/teams/england/england';
import Team from './components/teamProfile';
import Player from './components/playerProfile';
import { Route, Switch } from 'react-router-dom';

function App() {
    return (
        <Switch>
            <Route exact path="/">
                <Areas />
            </Route>
            <Route path="/team">
                <Team />
            </Route>
            <Route path="/player">
                <Player />
            </Route>
            <Route path="/england">
                <England />
            </Route>
        </Switch>
    );
}

export default App;
