import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import AppBar from "./Components/AppBar";
import TransactionList from "./Components/TransactionList";
import moment from "moment";

function App() {
  const [AllTransaction, setAllTransaction] = useState([]);
  const [editTransaction, setEditAllTransaction] = useState({
    _id: "",
    amount: null,
    details: "",
    date: new Date().now,
  });

  const { register, handleSubmit, getValues, setValue, reset } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: editTransaction,
  });

  useMemo(() => {
    setValue("_id", editTransaction?._id);
    setValue("amount", editTransaction?.amount);
    setValue("description", editTransaction?.description);
    setValue(
      "date",
      editTransaction?.date
        ? moment(editTransaction?.date).format("yyyy-MM-DD")
        : null
    );
  }, [editTransaction, setValue]);
  console.log(getValues());

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
    console.log(data);
    if (editTransaction?._id) {
      const { amount, description, date } = data;
      console.log("update");
      await axios
        .patch(
          `${process.env.REACT_APP_BASE_URL}/transaction/${editTransaction?._id}`,
          { amount, description, date },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response?.status === 200) {
            fetchTransaction_Data();
            console.log("data updated");
            setEditAllTransaction({});
          }
        });
    } else {
      console.log("submit");
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/transaction`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response?.status === 201) {
            fetchTransaction_Data();
            console.log("data Saved");
          }
        });
    }
    reset();
  };

  return (
    <div className="bg-expensor-grey-15">
      <>
        <Router>
          <AppBar />
        </Router>
      </>
      <form className="row g-4 m-5" onSubmit={handleSubmit(onSubmit)}>
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
              {...register("description", {
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
        <button
          type="submit"
          className={`col-sm-1 btn btn-sm btn-${
            editTransaction?._id ? "danger" : "success"
          }`}
        >
          {editTransaction?._id ? "Update" : "Submit"}
        </button>
      </form>

      <TransactionList
        AllTransaction={AllTransaction}
        refetchTransaction={fetchTransaction_Data}
        setEditAllTransaction={setEditAllTransaction}
      />
    </div>
  );
}

export default App;
