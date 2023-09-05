import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";
import { useLocation, useNavigate } from "react-router-dom";

function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  ...props
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(location?.state?.product); //setState yerıne bunu kullanıyoruz
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    //const { productId } = location.state
    //setProduct(location?.state?.product);
  }, [props.product]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((previousProduct) => ({
      ...previousProduct, //önceki productu extend et
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));
    setErrors((previousErrors) => ({
      ...previousErrors,
      productName: "Ürün ismi olmalıdır",
    }));
  }
  function handleSave(event) {
    event.preventDefault();

    saveProduct(product).then(() => {
      navigate("/"); //daha önce geldıgımız sayfalara yonledırme yaptıgımız ulastıgımız bır yer
    });
  }
  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    ></ProductDetail>
  );
}

export function getProductById(products, productId) {
  // eslint-disable-next-line eqeqeq
  let product = products.find(product => product.id == productId) || null;
  return product;
  
}

function mapStateToProps(state, ownProps) {
  //ownProps bir ürünü güncellemek ıstedıgımız queryStrıng ıle gecıyoruz o query strınk okuma ısını ownPropsla okutoruz
  const productId = ownProps?.match?.params?.productId; //varsa anlamına gelıyor soru işareti nullCheck kontrolu
  //const { productId } = ownProps
  console.log(productId);
  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId)
      : {};
  return {
    product,
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
