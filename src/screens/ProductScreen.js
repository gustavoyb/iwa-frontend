import "./ProductScreen.css";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { CarritoContext } from "../context/carritoContext";
import toast, { Toaster } from "react-hot-toast";

const ProductScreen = () => {
  const { id } = useParams();

  const [remera, setRemera] = useState([]);

  const { carrito, setCarrito } = useContext(CarritoContext);

  useEffect(() => {
    fetch(`/remera/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setRemera(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  async function agregarProductoAlCarro() {
    let selectSize = document.getElementById("selectSize");
    let size = selectSize.value;
    if (size !== "") {
      const remeraAgregada = {
        remeraId: remera.id,
        remeraPrice: remera.price,
        remeraImage: remera.frontimgurl,
        remeraSize: size,
        remeraName: remera.name,
      };
      setCarrito([...carrito, remeraAgregada]);
      toast.success("SHIRT ADDED TO THE CART!");
    } else {
      toast.error("SHIRT SIZE MUST BE SELECTED");
    }
  }

  return (
    <div className="productscreen">
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="productscreen__left">
        <div className="image">
          <img src={remera.frontimgurl} alt="product name" />
        </div>

        <div className="info">
          <p className="left__name">{remera.name}</p>
          <p>${remera.price}</p>
          <p>{remera.description}</p>

          <div className="info__venta">
            <p className="info__size">
              Size:
              <select id="selectSize">
                {remera.xxs_stock > 0 ? (
                  <option value="1">XXS</option>
                ) : (
                  <option disabled value="1">
                    XXS
                  </option>
                )}
                {remera.xs_stock > 0 ? (
                  <option value="2">XS</option>
                ) : (
                  <option disabled value="2">
                    XS
                  </option>
                )}
                {remera.s_stock > 0 ? (
                  <option value="3">S</option>
                ) : (
                  <option disabled value="3">
                    S
                  </option>
                )}
                {remera.m_stock > 0 ? (
                  <option value="4">M</option>
                ) : (
                  <option disabled value="4">
                    M
                  </option>
                )}
                {remera.l_stock > 0 ? (
                  <option value="5">L</option>
                ) : (
                  <option disabled value="5">
                    L
                  </option>
                )}
                {remera.xl_stock > 0 ? (
                  <option value="6">XL</option>
                ) : (
                  <option disabled value="7">
                    XL
                  </option>
                )}
                {remera.xxl_stock > 0 ? (
                  <option value="7">XXL</option>
                ) : (
                  <option disabled value="8">
                    XXL
                  </option>
                )}
              </select>
            </p>
            <p>
              <button type="button" onClick={agregarProductoAlCarro}>
                ADD TO CART
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
