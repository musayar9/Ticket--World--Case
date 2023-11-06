import SiteRoutes from "./SiteRoutes";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="container mx-auto w-90">
        <SiteRoutes />
      </div>
    </>
  );
}

export default App;
