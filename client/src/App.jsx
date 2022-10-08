import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import moment from "moment";

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="number"
          placeholder="Enter transaction amount"
          {...register("amount", {
            required: false,
          })}
        />
        <input
          type="text"
          placeholder="Enter transaction details"
          {...register("details", {
            required: false,
          })}
        />
        <input
          type="date"
          defaultValue={getValues("date")}
          {...register("date")}
        />
        <button type="submit">Submit</button>
      </form>
      <br />
      <section>
        <table border={1}>
          <thead>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
          </thead>
          <tbody>
            {AllTransaction?.map((items, index) => (
              <tr key={index}>
                <td>{items?.amount}</td>
                <td>{items?.description}</td>
                <td>
                  {items?.date ? moment(items?.date).format("DD-MM-Y") : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
