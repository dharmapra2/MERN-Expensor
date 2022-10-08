import React from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
function App() {
  const { register, handleSubmit, getValues } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const onSubmit = (data, e) => console.log(data, e);
  console.log(getValues("date"));
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="number"
          placeholder="Enter transaction amount"
          {...register("amount", {
            required: true,
          })}
        />
        <input
          type="text"
          placeholder="Enter transaction details"
          {...register("details", {
            required: true,
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
