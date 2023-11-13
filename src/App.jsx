import SiteRoutes from "./SiteRoutes";
import AvatarModal from "./components/AvatarModal";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="mx-auto w-[100%]">
        <SiteRoutes />
      </div>
      <AvatarModal/>
    </>
  );
}

export default App;
