import { routes } from "./constants/routes";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Layout } from "./components/Layout/Layout";
import { Launches } from "./pages/Launches/Launches";
import { LaunchDetails } from "./pages/LaunchDetails/LaunchDetails";
import { Ships } from "./pages/Ships/Ships";
import { ShipDetails } from "./pages/ShipDetails/ShipDetails";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.launches} element={<Launches />} />
        <Route path={routes.launchDetails} element={<LaunchDetails />} />
        <Route path={routes.ships} element={<Ships />} />
        <Route path={routes.shipDetails} element={<ShipDetails />} />
        <Route path={routes.pageNotFound} element={<PageNotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
