import * as React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const CardProduct = ({ id, title, price, imageUrl, productUrl, stock }) => {
  return (
    <Link to={productUrl} target="_blank">
      <div className="card-product" style={{ margin: 10 }}>
        <img
          className="card-img-top-product"
          src={imageUrl}
          style={{
            width: 100,
            height: 100,
            objectFit: "cover",
            borderRadius: 10,
          }}
          alt=""
        />
        <div className="card-body-product">
          <h5 className="card-id-product">{id}</h5>
          <h5 className="card-desc-product">{`Rp. ${price.toLocaleString(
            "id-ID"
          )}`}</h5>
          {/* <h5 className="card-desc-product">{`Stok : ${stock}`}</h5> */}
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
