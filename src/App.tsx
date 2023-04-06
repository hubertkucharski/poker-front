import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {SingleRoom} from './Components/SingleRoom/SingleRoom';
import './global.css'
import {ActivityStoreContext, ActivityStore} from "./stores/activityStore";

const activityStore = new ActivityStore();

function App() {
    return (
            <ActivityStoreContext.Provider value={activityStore}>
                <Router>
                    <Routes>
                        <Route path="/single-room" element={<SingleRoom/>}/>
                        {/*<Route path="/poker-room/:roomId" element={<Chat/>} />*/}
                    </Routes>
                </Router>
            </ActivityStoreContext.Provider>
    )
}

export default App;
