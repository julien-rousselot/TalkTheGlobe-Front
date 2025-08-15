import {ReactNode} from "react";
import Header from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Layout = ({children}: {children: ReactNode}) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1 pt-[80px]">{children}</main>
    <Footer />
  </div>
);

export default Layout;
