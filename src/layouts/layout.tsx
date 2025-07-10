import {ReactNode} from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Layout = ({children}: {children: ReactNode}) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
