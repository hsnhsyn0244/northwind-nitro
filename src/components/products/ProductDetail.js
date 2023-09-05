import React from "react";
import TextInput from "../toolbox/TextInput";
import SelectInput from "../toolbox/SelectInput";

const ProductDetail = ({ categories, product,errors, onSave, onChange=() => {} }) => {
  
  return (
    <form onSubmit={onSave}>
      <h2>{product?  "Güncelle" : "Ekle"}</h2>
      {console.log(product)}

      <TextInput
        name="productName"
        label="Product Name"
        value={product?.productName}
        onChange={onChange}
        error={errors.productName}
      />
      <SelectInput
        name="categoryId"
        label="Category"
        value={product?.categoryId}
        defaultOption={"Seçiniz"}
        options={categories.map((category) => ({
          value: category.id,
          text: category.categoryName,
        }))}
        onChange={onChange}
        error={errors.categoryId}
      />
      <TextInput
        name="unitPrice"
        label="Unit Price"
        value={product?.unitPrice}
        onChange={onChange}
        error={errors.unitPrice}
      />
      <TextInput
        name="quantityPerUnit"
        label="Quantitiy Per Unit"
        value={product?.quantityPerUnit}
        onChange={onChange}
        error={errors.quantitiyPerUnit}
      />
      <TextInput
        name="unitsInStock"
        label="Unit In Stock "
        value={product?.unitsInStock}
        onChange={onChange}
        error={errors.unitInStock}
      />
      <button type="submit" className="btn btn-primary">
        Kaydet
      </button>
    </form>
  );
};

export default ProductDetail;
