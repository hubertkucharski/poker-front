import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {SingleRoom} from './Components/SingleRoom/SingleRoom';
import './global.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/single-room" element={<SingleRoom/>}/>
                {/*<Route path="/poker-room/:roomId" element={<Chat/>} />*/}
            </Routes>
        </Router>
    );
}

export default App;
