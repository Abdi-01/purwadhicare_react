import React from "react";

function ProductDetail() {
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="j col-6">
          <img
            style={{ width: "85%" }}
            src="https://hdmall.id/system/image_attachments/images/000/008/725/medium/panadol-cold-flu-reg-tab-10s-hijau-1.jpg"
            alt=""
          />
        </div>

        <div className="col-6 d-flex flex-column justify-content-center">
          <h4>This Product Name </h4>
          <h5>Rp. 19000,-</h5>
          <p>
            Product Description Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Suscipit sit at dicta perferendis, veniam, facilis
            blanditiis perspiciatis ipsam qui eveniet dolores ratione distinctio
            doloribus ipsum, repellat error enim natus? Aut?
          </p>
          <div className="d-flex flex-row align-items-center justify-content-center my-3">
            <button className="mr-4 rounded-circle btn btn-info">-</button>2
            <button className="rounded-pill btn btn-info mx-4">+</button>
          </div>
          <button className="btn btn-success mt-4">Add To Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
