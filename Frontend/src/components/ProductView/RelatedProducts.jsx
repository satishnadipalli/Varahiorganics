import React, { useState } from "react";
import "./ProductView.css";

const ProductView = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="product-view">
      {/* Product Images Section */}
      <div className="product-images">
        <img
          src={product?.images?.[selectedImage]}
          alt="Product"
          className="main-image"
        />
        <div className="thumbnail-container">
          {product?.images?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              className={`thumbnail ${
                selectedImage === index ? "selected" : ""
              }`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="product-details">
        <h1>{product?.name}</h1>
        <p className="description">{product?.description}</p>
        <p className="price">Price: ${product?.price?.toFixed(2)}</p>

        <div className="quantity-controls">
          <button onClick={handleDecrement} className="quantity-btn">-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrement} className="quantity-btn">+</button>
        </div>

        <div className="action-buttons">
          <button className="add-to-basket">Add to Basket</button>
          <button className="buy-now">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
