import ReactDOM from "react-dom";
import BackDrop from "../Modal/BackDrop";
import Header from "../Utils/header/Header";
import { Outlet } from "react-router-dom";
function RootLayout() {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop></BackDrop>,
        document.getElementById("modal")
      )}
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
}

export default RootLayout;
