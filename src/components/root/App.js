import React from "react";
import Navi from "../navi/Navi";
import { Container } from "reactstrap";
import DashBord from "./DashBord";
import { Route, Routes } from "react-router-dom";
import CartDetail from "../cart/CartDetail";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
import NotFound from "../common/NotFound";

function App() {
  return (
    <div>
      <Container>
        <Navi />
        <Routes>
          <Route path="*" exact element={<NotFound />} />  
          <Route path="/" exact element={<DashBord />} />
          <Route path="/product"  element={<DashBord />} />
          <Route exact path="/saveproduct"  element={<AddOrUpdateProduct />} />
          <Route path="/saveproduct/:productId"  element={<AddOrUpdateProduct />}/>
          <Route path="/cart"  element={<CartDetail />} />
          
        </Routes>
      </Container>
    </div>
  );
}

export default App;
