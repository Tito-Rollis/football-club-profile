import './App.css';
import Areas from './pages/areas/areas';
import England from './pages/teams/england';
import Germany from './pages/teams/germany';
import { Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<Areas />} />
            <Route path="areas" element={<Areas />} />
            <Route path="england" element={<England />} />
            <Route path="germany" element={<Germany />} />
        </Routes>
        // <Areas />
        // <Teams />
    );
}

export default App;
