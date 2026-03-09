import { routes } from "./constants/routes";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Layout } from "./components/Layout/Layout";
import { Launches } from "./pages/Launches/Launches";
import { LaunchDetails } from "./pages/LaunchDetails/LaunchDetails";
import { Ships } from "./pages/Home/Ships/Ships";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.launches} element={<Launches />} />
        <Route path={routes.launchDetails} element={<LaunchDetails />} />
        <Route path={routes.ships} element={<Ships />} />
      </Routes>
    </Layout>
  );
}

export default App;
