import AppBar from "../AppBar/AppBar";
import { LayoutProps } from "./Layout.types";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <AppBar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
