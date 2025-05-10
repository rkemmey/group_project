import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AboutSud from "./pages/AboutSud";
import AboutNono from "./pages/AboutNono";
import SudPage from "./pages/SudPage";
import NonoPage from "./pages/NonoPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";
import SudGame from "./components/SudGame";
import NonoGame from "./components/NonoGame";
import KakuroPage from "./pages/KakuroPage";
import TentsPage from "./pages/TentsPage";
import KakuroNewPage from "./pages/KakuroNewPage";
import TentsNewPage from "./pages/TentsNewPage";
import AboutKakuro from "./pages/AboutKakuro";
import AboutTents from "./pages/AboutTents";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/login/", element: <Login />},
        { path: "/signup/", element: <SignUp />},
        { path: "/about-sudoku/", element: <AboutSud />},
        { path: "/about-nonogram/", element: <AboutNono />},

        { path: "/about-kakuro/", element: <AboutKakuro />},
        { path: "/about-tents/", element: <AboutTents />},

        { path: "/sudoku/", element: <SudPage />},
        { path: "/nonogram/", element: <NonoPage />},
        { path: "/nonogram/:id", element: <NonoGame /> },
        { path: "/kakuro/new", element: <KakuroNewPage /> }, // <-- add this
        { path: "/kakuro/:id", element: <KakuroPage /> },  // newly added
        { path: "/tents/new", element: <TentsNewPage /> },
        { path: "/tents/:id", element: <TentsPage /> },    // newly added
        { path: "/profile/", element: <ProfilePage />}, 
        { path: "*", element: <NotFound /> },
      ],
      errorElement: <ErrorPage />,
    },
  ]);
  
  export default router;