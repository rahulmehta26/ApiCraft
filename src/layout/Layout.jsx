import { Outlet } from "react-router-dom";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { twMerge } from "tailwind-merge";
import { useMenuModal } from "../store/useMenuModal";
import MobileMenu from "../components/ui/mobile-menu";

const Layout = () => {
  const { isOpen, toggleModal } = useMenuModal();
  return (
    <div
      className={twMerge(
        "min-h-screen md:w-[54rem] lg:w-4xl xl:w-7xl relative mx-auto"
      )}
    >
      <div
        className={twMerge(
          "bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]",
          "absolute inset-0"
        )}
      />

      {isOpen && <MobileMenu isOpen={isOpen} toggleState={toggleModal} />}

      <Header />

      <Outlet />

      <Footer />
    </div>
  );
};

export default Layout;
