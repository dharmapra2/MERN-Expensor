import React from "react";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TransactionList({
  AllTransaction,
  refetchTransaction,
  setEditAllTransaction,
}) {
  const editItem = (data) => {
    setEditAllTransaction(data);
  };

  const deleteItem = async (data) => {
    const token = localStorage.getItem("token") ?? "";

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        showLoaderOnConfirm: true,
        preConfirm: async (_login) => {
          return await axios
            .delete(`${process.env.REACT_APP_BASE_URL}/transaction/${data}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              return response;
            })
            .catch((error) => {
              Swal.showValidationMessage(`Something went wrong: ${error}`);
            });
        },
        backdrop: true,
        allowOutsideClick: () => !Swal.isLoading(),
      })
      .then((result) => {
        if (result?.value?.status === 200) {
          /* agian fetch the data */
          refetchTransaction();
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
          setEditAllTransaction({
            _id: "",
            amount: null,
            details: "",
            date: new Date().now,
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };
  // console.log(AllTransaction);
  return (
    <section className="table table-responsive-sm my-5">
      <table className="table table-striped table-hover table-borderless table-primary align-middle text-center">
        <thead className="table-dark">
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Amount</th>
            <th scope="col">Description</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {AllTransaction?.map((items, index) => (
            <tr className="table-primary" key={index}>
              <td>{index + 1}</td>
              <td>{items?.amount}</td>
              <td>{items?.description}</td>
              <td>
                {items?.date ? moment(items?.date).format("DD-MM-Y") : ""}
              </td>
              <td>
                <div className="d-flex justify-content-center gap-3">
                  <FontAwesomeIcon
                    icon={faPen}
                    height={12}
                    width={10}
                    className={"btn btn-warning"}
                    onClick={() => editItem(items)}
                  />
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    height={12}
                    width={10}
                    className={"btn btn-danger"}
                    onClick={() => deleteItem(items?._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TransactionList;
