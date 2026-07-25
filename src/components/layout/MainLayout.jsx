import "./MainLayout.css";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import BottomBar from "./BottomBar";

function MainLayout({ children }) {

    return (

        <>

            <Navbar />

            <div className="main-layout">

                <Sidebar />

                <main className="main-content">

                    {children}

                </main>

                <RightSidebar />

            </div>

            <BottomBar />

        </>

    );

}

export default MainLayout;