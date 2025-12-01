import Navbar from './navbar';
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="App">

    <Navbar />
      <main className="content">
        <Outlet /> {/* Routed children render here */}
      </main>
    </div>
  );
}

export default RootLayout;
