import { routes } from "./constants/routes";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Layout } from "./components/Layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={routes.home} element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;
