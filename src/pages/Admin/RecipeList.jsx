import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../../constants/API";

const RecipeList = () => {
  const [order, setOrder] = useState([]);
  console.log(order);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = () => {
    Axios.get(API_URL + "/order/recipe-success-admin")
      .then((res) => {
        setOrder(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderOrder = () => {
    return order.map((val, index) => {
      return (
        <>
          <tr>
            <th scope="row">{index + 1}</th>
            <td>{val.product_name}</td>
            <td>{val.category}</td>
            <td>
              {val.recipe_netto} {val.unit}
            </td>
          </tr>
        </>
      );
    });
  };

  return (
    <div className="content-page">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="header-title mt-0 mb-1">List Order Recipe</h4>
                  <p className="sub-header">Menampilkan kesulurhan obat yang terjual melalui resep.</p>
                  <div className="table-responsive">
                    <table className="table m-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nama Product</th>
                          <th>Kategori</th>
                          <th>Netto Terjual</th>
                        </tr>
                      </thead>
                      <tbody>{renderOrder()}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeList;
