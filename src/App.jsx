import SiteRoutes from "./SiteRoutes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="mx-auto w-[100%]">
        <SiteRoutes />
      </div>
    </>
  );
}

export default App;
