import SiteRoutes from "./SiteRoutes";
import AvatarModal from "./components/AvatarModal";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="mx-auto w-[100%]">
        <SiteRoutes />
      </div>
      <AvatarModal/>
      <Footer/>
    </>
  );
}

export default App;
