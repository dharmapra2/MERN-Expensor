import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import AppBar from "./Components/AppBar";
import TransactionList from "./Components/TransactionList";

function App() {
  const [AllTransaction, setAllTransaction] = useState([]);
  const { register, handleSubmit, reset } = useForm({
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

      <TransactionList AllTransaction={AllTransaction} />
    </div>
  );
}

export default App;
