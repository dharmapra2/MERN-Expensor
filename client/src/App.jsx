import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import AppBar from "./Components/AppBar";

function App() {
  const [AllTransaction, setAllTransaction] = useState([]);
  const { register, handleSubmit, getValues, reset } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const fetchTransaction_Data = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/transaction`)
      .then((response) => setAllTransaction(response?.data?.transaction));
  };

  useEffect(() => {
    return () => {
      fetchTransaction_Data();
    };
  }, []);

  const onSubmit = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/transaction`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        if (response?.status === 201) {
          fetchTransaction_Data();
          reset();
        }
      });
  };

  return (
    <div className="bg-expensor-grey-15">
      <>
        <Router>
          <AppBar />
        </Router>
      </>
      <form className="row g-2 m-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-sm-3">
          <div className="form-floating form-floating-sm">
            <input
              type="number"
              className="form-control form-control-sm"
              id="floatingInputGrid"
              placeholder="Enter transaction amount"
              {...register("amount", {
                required: false,
              })}
            />
            <label htmlFor="floatingInputGrid">Amount</label>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="form-floating">
            <input
              type="text"
              className="form-control form-control-sm"
              id="floatingInputGrid"
              placeholder="Enter Descrition"
              {...register("details", {
                required: false,
              })}
            />
            <label htmlFor="floatingInputGrid">Descritption</label>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="form-floating">
            <input
              type="date"
              className="form-control form-control-sm"
              id="floatingInputGrid"
              {...register("date", {
                required: false,
              })}
            />
            <label htmlFor="floatingInputGrid">Date</label>
          </div>
        </div>
        <button type="submit" className="col-sm-1 btn btn-sm btn-success">
          Submit
        </button>
      </form>
      
      <section className="table table-responsive-sm my-5">
        <table className="table table-striped table-hover table-borderless table-primary align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th scope="col">Amount</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {AllTransaction?.map((items, index) => (
              <tr className="table-primary" key={index}>
                <td scope="row">{items?.amount}</td>
                <td>{items?.description}</td>
                <td>
                  {items?.date ? moment(items?.date).format("DD-MM-Y") : ""}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </section>
    </div>
  );
}

export default App;
