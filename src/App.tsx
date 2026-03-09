import { routes } from "./constants/routes";
import { Route, Routes } from "react-router-dom";
import { HomeWithTitle } from "./pages/Home/Home";
import { Layout } from "./components/Layout/Layout";
import { LaunchesWithTitle } from "./pages/Launches/Launches";
import { LaunchDetails } from "./pages/LaunchDetails/LaunchDetails";
import { ShipDetails } from "./pages/ShipDetails/ShipDetails";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";
import { ShipsWithTitle } from "./pages/Ships/Ships";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path={routes.home} element={<HomeWithTitle />} />
          <Route path={routes.launches} element={<LaunchesWithTitle />} />
          <Route path={routes.launchDetails} element={<LaunchDetails />} />
          <Route path={routes.ships} element={<ShipsWithTitle />} />
          <Route path={routes.shipDetails} element={<ShipDetails />} />
          <Route path={routes.pageNotFound} element={<PageNotFound />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
