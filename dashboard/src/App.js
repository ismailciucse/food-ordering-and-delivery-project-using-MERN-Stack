import Cookies from "js-cookie";
import "./App.css";
import LayOut from "./component/common/layout/LayOut";
import Login from "./component/login/Login";

function App() {
  return (
    <>
      {Cookies.get("admin") ? (
        <LayOut />
      ) : (
        // (window.location.href = `${process.env.REACT_APP_FRONTEND}/admin`)(
        //   <h3>Authintication required</h3>
        // )
        <Login />
      )}
    </>
  );
}

export default App;
