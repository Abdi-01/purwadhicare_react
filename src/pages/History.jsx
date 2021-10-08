import React from "react";

function History() {
  return (
    <div className="p-5">
      <h1>Transaction History</h1>
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
            <tbody>
              <tr>
                <td>26-03-2021</td>
                <td>3 Items</td>
                <td>Rp. 44000</td>
                <td>
                  <button className="btn btn-info">See Details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-header">
              <strong>Transaction Details</strong>
            </div>
            <div className="card-body">
              <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                <span className="font-weight-bold">Panadol (3)</span>
                <span>Rp. 12000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
