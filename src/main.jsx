import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/Store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import Dashboard from "./pages/DashBoard.jsx";
import CreateWalletPage from "./pages/CreateWalletPage.jsx";
import WalletDetailView from "./components/WalletDetails.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import NotFound from "./pages/NotFoundPage.jsx";
import AdminPortal from "./pages/AdminPortal.jsx";
import CreateCurrencyPage from "./pages/CreateCurrencyPage.jsx";
import ViewCurrencyPage from "./pages/ViewCurrencyPage.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import OAuthCallback from "./components/OAuthCallback.jsx";

const router = createBrowserRouter([
  // ----- Public & App Pages -----
  {
    path: "/",
    element: <App />, // Only for main website layout
    children: [
      { index: true, element: <PublicRoute><Home /></PublicRoute> },
      { path: "login", element: <PublicRoute><LoginPage /></PublicRoute> },
      { path: "signup", element: <PublicRoute><SignUpPage /></PublicRoute> },
      { path: "oauth-callback", element: <OAuthCallback /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "create-wallet", element: <CreateWalletPage /> },
          { path: "settings", element: <SettingsPage /> },
          { path: "wallet/:walletId", element: <WalletDetailView /> },
        ],
      },
    ],
  },

  // ----- Admin Portal (fully separate) -----
  {
    path: "/admin-portal",
    element: <PrivateRoute adminOnly={true}> <AdminLayout/> </PrivateRoute>,
    children: [
      { index: true, element: <AdminPortal /> },
      { path: "create-currency", element: <CreateCurrencyPage/> },
      { path: "view-currencies", element: <ViewCurrencyPage/> },
    ],
  },

  // ----- 404 -----
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);