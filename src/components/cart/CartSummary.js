import React, { Component } from "react";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";
import { connect } from "react-redux";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

class CartSummary extends Component {
  removeFromCart(product) {
    this.props.actions.removeFromCart(product);
    alertify.error(product.productName + " Sepetden Silindi");
  }
  renderEmpty() {
    return (
      <NavItem>
        <NavLink>Sepetiniz Boş</NavLink>
      </NavItem>
    );
  }
  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Sepetiniz
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              <Badge
                onClick={() =>
                  this.removeFromCart(cartItem.product)
                }
                color="danger"
              >
                X
              </Badge>
              {cartItem.product.productName}
              <Badge color="success">{cartItem.quantity}</Badge>
            </DropdownItem>
          ))}

          <DropdownItem divider />
          <DropdownItem>
            <Link to={"/cart"}>Sepete Git</Link>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  render() {
    return (
      <div>
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  //bır aksıyon kullanmak ıcın bunu kullanrıız
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
}
function mapStateToProps(state) {
  //bir stateye bağlanmak içinde bunu kullanırız.
  return {
    cart: state.cartReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
