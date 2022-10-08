import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
function App() {
  const { register, handleSubmit, getValues } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/transaction`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
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
    </div>
  );
}

export default App;
