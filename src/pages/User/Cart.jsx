import React from "react";

function Cart() {
  return (
    <div className="p-5">
      <div className="row ">
        <div className="p-5 col-12 text-center">
          <h1>Cart</h1>
          <table className="table mt-4">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
            <tfoot className="bg-light">
              <tr>
                <td colSpan="7">
                  <button className="btn rounded-pill btn-success">Success</button>
                </td>
              </tr>

            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Cart;
