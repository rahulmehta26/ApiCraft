import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Loader from "./components/ui/loader";
import pageTransition from "./animations/page-transition";
import ErrorState from "./pages/error/page-not-found";

const Home = lazy(() => import("./pages/home/home"));
const Craft = lazy(() => import("./pages/api-craft/craft"));

const CraftWithTransition = pageTransition(Craft);

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/craft"
          element={
            <Suspense fallback={<Loader />}>
              <CraftWithTransition />
            </Suspense>
          }
        />

        <Route
          path="*"
          element={
            <Suspense fallback={<Loader />}>
              <ErrorState />
            </Suspense>
          }
      />
      </Route>
  
    </Routes>
  );
};

export default App;
