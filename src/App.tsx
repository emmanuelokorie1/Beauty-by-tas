import { Suspense, lazy } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layouts from "./Layouts/Layouts";
import Loading from "./Components/Loading";
import Shop from "./Pages/Shop/Shop";
import Discover from "./Pages/Discover/Discover";
import About from "./Pages/About/About";
import Bag from "./Pages/Bag/Bag";
import Cart from "./Pages/Cart/Cart";
import Login from "./Pages/Auths/NotAth/Login";
import SignUp from "./Pages/Auths/NotAth/SignUp";
import ForgetPassword from "./Pages/Auths/NotAth/ForgetPassword";
import Faq from "./Pages/Faq/Faq";
import Privacy from "./Pages/Faq/Privacy";
// import Layouts from "./Layouts/Layouts";
// import Loading from "./Layouts/Loading";

const Home = lazy(() => import("./Pages/Home/Home"));
const NotLoggedIn = lazy(() => import("./Pages/Auths/NotAth/NotLoggedIn"));
const Contact = lazy(() => import("./Pages/Contact/Contact"));
const Profile = lazy(() => import("./Pages/Auths/Profiles/Profile"));
// const Career = lazy(() => import("./Pages/Career/Career"));
// const News = lazy(() => import("./Pages/News/News"));
// const WhoAreWe = lazy(() => import("./Pages/About/matrix/WhoAreWe"));
// const OurCoreValue = lazy(() => import("./Pages/About/matrix/OurCoreValue"));
// const OurFocus = lazy(() => import("./Pages/About/matrix/OurFocus"));
// const CoreServices = lazy(() => import("./Pages/Services/Metrix/CoreServices"));
// const ValueAddedServices = lazy(() => import("./Pages/Services/Metrix/ValueAddedServices"));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layouts />}>
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />

          <Route
            path="/shop"
            element={
              <Suspense fallback={<Loading />}>
                <Shop />
              </Suspense>
            }
          />
          <Route
            path="/discover"
            element={
              <Suspense fallback={<Loading />}>
                <Discover />
              </Suspense>
            }
          />
          <Route
            path="/about-us"
            element={
              <Suspense fallback={<Loading />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/contact-us"
            element={
              <Suspense fallback={<Loading />}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="/description"
            element={
              <Suspense fallback={<Loading />}>
                <Bag />
              </Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<Loading />}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<Loading />}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="/auth"
            element={
              <Suspense fallback={<Loading />}>
                <NotLoggedIn />
              </Suspense>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="forget-password" element={<ForgetPassword />} />
          </Route>

          <Route
            path="/faq"
            element={
              <Suspense fallback={<Loading />}>
                <Faq />
              </Suspense>
            }
          />

          <Route
            path="/privacy"
            element={
              <Suspense fallback={<Loading />}>
                <Privacy />
              </Suspense>
            }
          />
        </Route>
      </Route>
    )
  );

  return (
    <div className="App bg-primary-background">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
