import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Plan from "./screens/Plan.jsx";
import Day from "./screens/Day.jsx";
import Exercise from "./screens/Exercise.jsx";
import Home from "./screens/Home.jsx";
import Play from "./screens/Play.jsx";
import { store } from "./state/store.js";
import { Provider } from "react-redux";
import ErrorElement from "./components/ErrorElement.jsx";

const router = createBrowserRouter([
    {
        path: "/Workout-Plan",
        element: <App />,

        children: [
            {
                path: "/Workout-Plan/",
                element: <Home />,
                errorElement: <ErrorElement />,
            },
            {
                path: ":PLAN",
                element: <Plan />,
            },

            { path: ":PLAN/:DAY", element: <Day /> },

            {
                path: ":PLAN/:DAY/:EXERCISE",
                element: <Exercise />,
            },
            {
                path: ":PLAN/:DAY/play",
                element: <Play />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </Provider>
);
