import * as actionTypes from "./actionTypes";

export function getProductsSuccess(products) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
}
export function createProductSucces(product) {
  return { type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: product };
}
export function updateProductSucces(product) {
  return { type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: product };
}

export function saveProductApi(product) {
  console.log(JSON.stringify(product));
  return fetch("http://localhost:3000/products/" + (product.id || ""), {
    // güncelleme için put ,  ekleme için post
    method: product.id ? "PUT" : "POST", //product id varsa put request yokse pot
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product), //STRINGFY --> STRINGLESTIRMEK (SİTRİNGLESTIRME SEBEBIMIZ REQUESTLER STRINK OLDUGU ICIN)
  })
    .then(handleResponse)
    .catch(handleError);
}
export function saveProduct(product) {
  return function (dispatch) {
    return saveProductApi(product)
      .then((savedProduct) => {
        product.id
          ? dispatch(updateProductSucces(savedProduct))
          : dispatch(createProductSucces(savedProduct));
      })
      .catch((error) => {
        throw error;
      });
  };
}
export async function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  const error = await response.text();
  throw new Error(error);
}
export function handleError(error) {
  console.error("bir hata oluştu");
  throw error;
}

export function getProducts(categoryId) {
  return function (dispatch) {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url = url + "?categoryId=" + categoryId; //seçili kategorye gore urunleri listelediğimiz yer
    }
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getProductsSuccess(result)));
    //response her zaman strıngdir onu json a cevırdıgımız yer burasıdır ki verileri okuyabilelim
  };
}
