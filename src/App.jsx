
import Data from "./components/Data";
import Cards from "./components/Cards";
import SiteRoutes from "./SiteRoutes";
import Header from "./components/Header";

function App() {
  return (
    <>
    {/* <h1>Home</h1> */}
    {/* <Data/> */}
    {/* <Categories/> */}
    {/* <ConcertCard/> */}
    <Cards/>
      <Header />
      <div className="container mx-auto w-90">
        <SiteRoutes />
      </div>
    </>
  );
}

export default App;
