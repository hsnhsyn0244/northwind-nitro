import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import { Badge, ListGroup, ListGroupItem } from "reactstrap";
import * as productActions from "../../redux/actions/productActions";

class CategoryList extends Component {
  //DOM düğümleri ile ilişkili atama işlemleri bu fonksiyon içerisinde yapılmalıdır.
  //Bu nedenle eğer verilerinizi uzak bir API'den yüklemeniz gerekiyorsa, ağ isteğini bu fonksiyonda
  //başlatabilirsiniz.
  componentDidMount() {
    this.props.actions.getCategories();
  }

  selectCategory = (category) => {
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts(category.id)
  };

  render() {
    return (
      <div>
        <h3>
          <Badge color="primary">Category List</Badge>
        </h3>
        <ListGroup>
          {this.props.categories.map((category) => (
            <ListGroupItem
              active={category.id === this.props.currentCategory.id}
              onClick={() => this.selectCategory(category)}
              key={category.id}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  //redux takı datayı proplara bagla demek
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  //proplara baglandıgımız yer
  return {
    actions: {
      //aksiyon cagırma metodu (bindActionCreators) dur.
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ),
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList); //connectle bu kodu da cagırdıgımızda redux a baglanıyoruz
