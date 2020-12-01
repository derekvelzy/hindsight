import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import StockPage from "./StockPage";
// import "../../client/dist/style.css";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/stock/:key" component={StockPage} />
      </div>
    </BrowserRouter>
  );
};

// import HelloWorld from "./HelloWorld";

// const App = () => <HelloWorld />;

export default App;
