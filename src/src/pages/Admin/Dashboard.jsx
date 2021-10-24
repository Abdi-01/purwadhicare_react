import React from "react";

function Dashboard() {
  return (
    <div className="content-page">
      <div className="content">
        <div className="container-fluid">
          <div className="row page-title align-items-center">
            <div className="col-sm-4 col-xl-6">
              <h4 className="mb-1 mt-0">Dashboard</h4>
            </div>
          </div>
          {/* content */}
          <div className="row">
            <div className="col-md-6 col-xl-3">
              <div className="card">
                <div className="card-body p-0">
                  <div className="media p-3">
                    <div className="media-body">
                      <span className="text-muted text-uppercase font-size-12 font-weight-bold">Today Revenue</span>
                      <h2 className="mb-0">$2189</h2>
                    </div>
                    <div className="align-self-center">
                      <div id="today-revenue-chart" className="apex-charts" />
                      <span className="text-success font-weight-bold font-size-13">
                        <i className="uil uil-arrow-up" /> 10.21%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="card">
                <div className="card-body p-0">
                  <div className="media p-3">
                    <div className="media-body">
                      <span className="text-muted text-uppercase font-size-12 font-weight-bold">Product Sold</span>
                      <h2 className="mb-0">1065</h2>
                    </div>
                    <div className="align-self-center">
                      <div id="today-product-sold-chart" className="apex-charts" />
                      <span className="text-danger font-weight-bold font-size-13">
                        <i className="uil uil-arrow-down" /> 5.05%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="card">
                <div className="card-body p-0">
                  <div className="media p-3">
                    <div className="media-body">
                      <span className="text-muted text-uppercase font-size-12 font-weight-bold">New Customers</span>
                      <h2 className="mb-0">11</h2>
                    </div>
                    <div className="align-self-center">
                      <div id="today-new-customer-chart" className="apex-charts" />
                      <span className="text-success font-weight-bold font-size-13">
                        <i className="uil uil-arrow-up" /> 25.16%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="card">
                <div className="card-body p-0">
                  <div className="media p-3">
                    <div className="media-body">
                      <span className="text-muted text-uppercase font-size-12 font-weight-bold">New Visitors</span>
                      <h2 className="mb-0">750</h2>
                    </div>
                    <div className="align-self-center">
                      <div id="today-new-visitors-chart" className="apex-charts" />
                      <span className="text-danger font-weight-bold font-size-13">
                        <i className="uil uil-arrow-down" /> 5.05%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* stats + charts */}
          <div className="row">
            <div className="col-xl-3">
              <div className="card">
                <div className="card-body p-0">
                  <h5 className="card-title header-title border-bottom p-3 mb-0">Overview</h5>
                  {/* stat 1 */}
                  <div className="media px-3 py-4 border-bottom">
                    <div className="media-body">
                      <h4 className="mt-0 mb-1 font-size-22 font-weight-normal">121,000</h4>
                      <span className="text-muted">Total Visitors</span>
                    </div>
                    <i data-feather="users" className="align-self-center icon-dual icon-lg" />
                  </div>
                  {/* stat 2 */}
                  <div className="media px-3 py-4 border-bottom">
                    <div className="media-body">
                      <h4 className="mt-0 mb-1 font-size-22 font-weight-normal">21,000</h4>
                      <span className="text-muted">Total Product Views</span>
                    </div>
                    <i data-feather="image" className="align-self-center icon-dual icon-lg" />
                  </div>
                  {/* stat 3 */}
                  <div className="media px-3 py-4">
                    <div className="media-body">
                      <h4 className="mt-0 mb-1 font-size-22 font-weight-normal">$21.5</h4>
                      <span className="text-muted">Revenue Per Visitor</span>
                    </div>
                    <i data-feather="shopping-bag" className="align-self-center icon-dual icon-lg" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="card">
                <div className="card-body pb-0">
                  <h5 className="card-title mb-0 header-title">Revenue</h5>
                  <div id="revenue-chart" className="apex-charts mt-3" dir="ltr" />
                </div>
              </div>
            </div>
            <div className="col-xl-3">
              <div className="card">
                <div className="card-body pb-0">
                  <h5 className="card-title header-title">Targets</h5>
                  <div id="targets-chart" className="apex-charts mt-3" dir="ltr" />
                </div>
              </div>
            </div>
          </div>
          {/* row */}
          {/* products */}
          <div className="row">
            {/* end col*/}
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body">
                  <a href="//" className="btn btn-primary btn-sm float-right">
                    {" "}
                    <i className="uil uil-export ml-1" /> Export{" "}
                  </a>
                  <h5 className="card-title mt-0 mb-0 header-title">Recent Orders</h5>
                  <div className="table-responsive mt-4">
                    <table className="table table-hover table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Product</th>
                          <th scope="col">Customer</th>
                          <th scope="col">Price</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>#98754</td>
                          <td>ASOS Ridley High</td>
                          <td>Otto B</td>
                          <td>$79.49</td>
                          <td>
                            <span className="badge badge-soft-warning py-1">Pending</span>
                          </td>
                        </tr>
                        <tr>
                          <td>#98753</td>
                          <td>Marco Lightweight Shirt</td>
                          <td>Mark P</td>
                          <td>$125.49</td>
                          <td>
                            <span className="badge badge-soft-success py-1">Delivered</span>
                          </td>
                        </tr>
                        <tr>
                          <td>#98752</td>
                          <td>Half Sleeve Shirt</td>
                          <td>Dave B</td>
                          <td>$35.49</td>
                          <td>
                            <span className="badge badge-soft-danger py-1">Declined</span>
                          </td>
                        </tr>
                        <tr>
                          <td>#98751</td>
                          <td>Lightweight Jacket</td>
                          <td>Shreyu N</td>
                          <td>$49.49</td>
                          <td>
                            <span className="badge badge-soft-success py-1">Delivered</span>
                          </td>
                        </tr>
                        <tr>
                          <td>#98750</td>
                          <td>Marco Shoes</td>
                          <td>Rik N</td>
                          <td>$69.49</td>
                          <td>
                            <span className="badge badge-soft-danger py-1">Declined</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* end table-responsive*/}
                </div>
                {/* end card-body*/}
              </div>
              {/* end card*/}
            </div>
            {/* end col*/}
          </div>
          {/* end row */}
        </div>
      </div>
      {/* content */}
    </div>
  );
}

export default Dashboard;
