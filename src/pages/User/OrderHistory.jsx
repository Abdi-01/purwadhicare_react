import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";

function History() {
  const globalUser = useSelector((state) => state.user);

  const [transactionList, setTransactionList] = useState([]);
  const [transactionDetail, setTransactionDetail] = useState([]);

  const fetchTransactions = () => {
    Axios.get(
      `http://localhost:2200/transaction/get-history?iduser=${globalUser.user.iduser}`)
      .then((result) => {
        console.log(result.data);
        setTransactionList(result.data);
      })
      .catch(() => {
        alert("Terjadi kesalahan di server transaction");
      });
  };
 

  const renderTransactions = () => {
    return transactionList.map((val) => {
      return (
        <tr>
          {/* val.nama field di sql , CEK LAGI*/}
          <td>{val.order_date}</td>
          <td>{val.total_item} Item(s)</td>
          <td>Rp. {val.order_price}</td>
          <td>
            <button
              onClick={() => seeDetailsBtnHandler(val.idorder)}
              className="btn btn-info"
            >
              See Details
            </button>
          </td>
        </tr>
      );
    });
  };

   
  const renderTransactionDetailItem = () => {
    return transactionDetail.map((val) => {
      return (
        <div className="d-flex my-2 flex-row justify-content-between align-items-center">
          <span className="font-weight-bold">
            {val.product_name} ({val.quantity})
          </span>
          <span>{val.price_stock * val.quantity}</span>
        </div>
      );
    });
  };

  const seeDetailsBtnHandler = (idorder) => {
    Axios.get(
      `http://localhost:2200/transaction/get-detail?idorder=${idorder}`)
      .then((result) => {
        console.log(result.data);
        setTransactionDetail(result.data);
      })
      .catch((err) => {
        alert("Terjadi kesalahan di server transaction");
        console.log(err)
      });
      };

  // seperti component did mount
  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <div className="p-5 mt-5">
      <h2>Transaction History</h2>
      <div className="row mt-5">
        <div className="col-8">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Transaction Date</th>
                <th>Total Item(s)</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderTransactions()}</tbody>
          </table>
        </div>
        <div className="col-4">
          {
          transactionDetail.length ?
          <div className="card">
            <div className="card-header">
              <strong>Transaction Details</strong>
            </div>
            <div className="card-body">
              {renderTransactionDetailItem()}
            </div>
          </div>
          : null
          }
          </div>
      </div>
    </div>
  );
}

export default History;
