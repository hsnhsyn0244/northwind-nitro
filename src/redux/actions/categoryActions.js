import * as actionTypes from "./actionTypes";

export function changeCategory(category) {
  return { type: actionTypes.CHANGE_CATEGORY, payload: category };
}

export function getCategoriesSuccess(categories) {
  return { type: actionTypes.GET_CATEGORİES_SUCCESS, payload: categories };
}

export function getCategories() {
  return function (dispatch) {
    let url = "http://localhost:3000/categories";
    return fetch(url)
      .then(response => response.json())
      .then(result => dispatch(getCategoriesSuccess(result)));
      
    //response her zaman strıngdir onu json a cevırdıgımız yer burasıdır ki verileri okuyabilelim
  };
}

// kategori ile alakalı aksiyonlarıda burada tanımladık. aksıyonları changecategory ısmıyle redux un anlayacagı sekle cevırdık
