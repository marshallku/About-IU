import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderNavigation from "./components/HeaderNavigation";
import Home from "./pages/Home";
import Discography from "./pages/Discography";
import DiscographyDetails from "./pages/DiscographyDetails";
import Filmography from "./pages/Filmography";
import Youtube from "./pages/Youtube";
import LocationUpdater from "./components/LocationUpdater";

function App() {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <HeaderNavigation />
            <main id="main">
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />} />
                        <Route path="Discography">
                            <Route index element={<Discography />} />
                            <Route
                                path=":album"
                                element={<DiscographyDetails />}
                            />
                        </Route>
                        <Route path="Filmography" element={<Filmography />} />
                        <Route path="Youtube" element={<Youtube />} />
                    </Route>
                </Routes>
            </main>
            <LocationUpdater />
        </BrowserRouter>
    );
}

export default App;
