import SiteRoutes from "./SiteRoutes";
import Header from "./components/Header";
import HeaderSlider from "./components/HeaderSlider";

function App() {
  return (
    <>
      <Header />
      {/* <HeaderSlider /> */}
      <div className="mx-auto w-[90%]">
        <SiteRoutes />
      </div>
    </>
  );
}

export default App;
