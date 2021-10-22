import React, { useEffect, useState } from "react";
import Axios from "axios";

// utk global state instal redux, redux-thunk, react-redux
import { useSelector } from "react-redux";

function Revenue() {
  const [allRevenue, setAllRevenue] = useState(0);
  const [selectedRevenue, setSelectedRevenue] = useState([]);
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const fetchAllRevenue = () => {
    Axios.get(`http://localhost:2200/transaction/all-revenue`)
      .then((result) => {
        console.log(result.data);
        setAllRevenue(result.data[0].allrevenue);
        
      })
      .catch(() => {
        alert("Terjadi kesalahan di server transaction");
      });
  };

  const startDateInputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value
    console.log(value)
    setStartDate(value)
  }

  const endDateInputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value
    console.log(value)
    setEndDate(value)
  }

   const selectRevenueByDate = (fromDate, lastDate) => {
    console.log(fromDate, lastDate)
    // http://localhost:2200/transaction/selected-revenue?fromDate=2020-9-01&lastDate=2020-11-31 
    Axios.get(`http://localhost:2200/transaction/selected-revenue?fromDate=${fromDate}&lastDate=${lastDate}`)
      .then((result) => {
        console.log(result.data);
        setSelectedRevenue(result.data);
      
      })
      .catch(() => {
        alert("Terjadi kesalahan di server transaction");
      });
  };

  const renderSelectedRevenue = () => {
    return selectedRevenue.map((val) => {
      if (val.selectedrevenue === null){
        return (
          <h2>Rp. 0</h2>
        )
       }
      return (
        <h2>Rp. {val.selectedrevenue.toLocaleString()}</h2>
        );
      });
     
  };

  
  const searchBtnHandler = () => {
    selectRevenueByDate(startDate, endDate)
    renderSelectedRevenue()
    setStartDate("")
    setEndDate("")
  }

  // seperti component did mount
  useEffect(() => {
    fetchAllRevenue();
    selectRevenueByDate()
  }, []);

  return (
    <div className="ml-10 pl-5 mt-5 p-3 mr-5">
      <div className="d-flex flex-row justify-content-center p-5">
        <h1> Puwadhicare Revenue Report </h1>
        <div className="row pl-5 ml-5 mt-0 d-flex flex-row-reverse">
        <img src="https://www.sipmaxhk.com/wp-content/uploads/2018/07/1503386269693-e1530982417990.jpg" alt="" />
        </div>
        
      </div>

      <div className="row pl-5 ml-5 d-flex flex-row-reverse">
        <div className="col-3">
          <div className="card shadow" >
            <div className="card-header">
              <strong>Filter revenue by date</strong>
            </div>

            <div className="card-body">
              <label htmlFor="startDate">From</label>
              <input
                name="startDate"
                type="date"
                className="form-control mb-3"
                onChange = {startDateInputHandler}
              />

              <label htmlFor="endDate">To</label>
              <input
                name="endDate"
                type="date"
                className="form-control mb-3"
                onChange={endDateInputHandler}
              />

              <button className="btn btn-block btn-info rounded-pill justify-content-center mt-5 mb-4" onClick={searchBtnHandler}>
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-8 card card-light text-center shadow">
          <div className="card-header text-left mt-2">
            <h4> All Total Revenue</h4>
          </div>
          <div className="card-body">
            <h2>Rp. {allRevenue.toLocaleString()}</h2>
          </div>
          <div className="card-header text-left">
            <h4>Filtered Revenue By Date</h4>
          </div>
          <div className="card-body">
            
            {renderSelectedRevenue()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Revenue;
