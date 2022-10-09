import React from "react";
import moment from "moment";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TransactionList({ AllTransaction }) {
  return (
    <section className="table table-responsive-sm my-5">
      <table className="table table-striped table-hover table-borderless table-primary align-middle text-center">
        <thead className="table-dark">
          <tr>
            <th>No.</th>
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
              <td className="d-flex justify-content-center gap-3">
                <button className="btn btn-warning">
                  <FontAwesomeIcon
                    icon={faPen}
                    height={12}
                    width={90}
                    className={"font-normal"}
                  />
                </button>
                <button className="btn btn-danger">
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    height={12}
                    width={90}
                    className={"font-normal"}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>npm i @fortawesome/free-solid-svg-icons
      </table>
    </section>
  );
}

export default TransactionList;
