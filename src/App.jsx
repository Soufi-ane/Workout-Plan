import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <>
            <div
                className=" sm:hidden"
                style={{
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontStyle: "normal",
                }}>
                <Toaster />
                <Header />
                <Outlet />
            </div>{" "}
            <div
                style={{
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontStyle: "normal",
                }}
                className="h-[100dvh] items-center justify-center w-full hidden sm:flex text-[1.10rem]">
                Use a smaller screen for a better experience
            </div>
        </>
    );
}

export default App;
