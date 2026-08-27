import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { Toaster } from "sonner";

const App = () => {
  return (
    <div className="bg-surface">
      <Navbar />
      <Toaster position="top-center" duration={3000} />
      <main className="container m-auto max-w-5xl min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App