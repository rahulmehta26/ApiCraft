import { Outlet } from "react-router-dom"
import Header from "../components/header/header"
import Footer from "../components/footer/footer"
import { twMerge } from "tailwind-merge"

const Layout = () => {
  return (
      <div className={twMerge(
          "min-h-screen md:w-[54rem] lg:w-4xl xl:w-7xl mx-auto"
      )} >   
          <Header />

          <Outlet />

          <Footer />
      </div>
  )
}

export default Layout