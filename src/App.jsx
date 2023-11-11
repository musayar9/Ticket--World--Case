import SiteRoutes from "./SiteRoutes";
// import Navbar from "./components/Navbar";
import NavbarExample from "./components/NavbarExample";
function App() {
  return (
    <>
      {/* <Navbar /> */}
      <NavbarExample />
      <div className="mx-auto w-[100%]">
        <SiteRoutes />
      </div>
    </>
  );
}

export default App;
