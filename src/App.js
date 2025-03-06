import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ImageDetails from './pages/ImageDetails';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details/:date" element={<ImageDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
