import SiteRoutes from "./SiteRoutes";
import Header from "./components/Header";
import HeaderSlider from "./components/HeaderSlider";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      {/* <Header /> */}
      {/* <HeaderSlider /> */}
      <Navbar/>
      <div className="container mx-auto w-90">
        <SiteRoutes />
      </div>
    </>
  );
}

export default App;
