import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./PrivateRoute";
import Payment from "./pages/Payment";
import ConcertDetailed from "./pages/ConcertDetailed";
import PageNotFound from "./components/PageNotFound";

export default function SiteRoutes() {
    return (<>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
            <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
            <Route path="/concert/:id" element={<ConcertDetailed />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </>)
}