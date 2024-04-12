import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" />
                </Routes>
            </Router>
        </div>
    );
}

export default App