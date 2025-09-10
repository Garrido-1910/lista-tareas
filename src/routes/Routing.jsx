import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Registro from "../pages/Registro";
import Home from "../pages/Home";

function Routing() {
    return(
    <Router>
        <Routes>
            <Route>
                <Route path="/" element={<Registro/>}/>
                <Route path="/tareas" element={<Home/>}/>
            </Route>
        </Routes>
    </Router>
    ) 
}
export default Routing