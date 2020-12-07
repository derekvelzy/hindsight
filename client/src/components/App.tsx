import React, { useState } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import StockPage from "./Page/StockPage";
// import "../../client/dist/style.css";

export const App: React.FC = () => {
  const [mode, setMode] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <div>
        <Route
          exact
          path="/"
          component={() => <Home mode={mode} setMode={setMode} />}
        />
        <Route path="/stock/:key" component={() => <StockPage />} />
      </div>
    </BrowserRouter>
  );
};

export default App;
