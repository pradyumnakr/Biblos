import '../assets/css/ConfirmationTable.css'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { asDollarsAndCents } from "../utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { BookItem, OrderDetails } from '../types'

import {OrderStore} from "../contexts/OrderContext";
import {useContext} from "react";
import { Link } from "react-router-dom";

function ConfirmationTable() {
  const { orderDetails} = useContext(OrderStore);
// A helper function - optional to use
  const bookAt = function (orderDetails: OrderDetails, index: number): BookItem {
  return orderDetails.books[index];
};
const orderDate =  () => {
    let date = new Date(orderDetails.order.dateCreated);
    return (date.toString());
};

  return (
      <div>
          <div className="cart-header-two">
              <p>ORDER CONFIRMED</p>
          </div>
          <div className="confirm-two">
              <p>Your confirmation number is {orderDetails.order.confirmationNumber}</p>
              <p>Your order date is {orderDate()}</p>
          </div>
          <div className="cart-table-two">
              <ul className="cart2">
                  <li className="table-heading">
                      <div className="heading-book">Book</div>
                      <div className="heading-price">Quantity</div>
                      <div className="heading-subtotal">Amount</div>
                  </li>
                  {orderDetails.books?.map((book, index) => (
                      <li key={index}>
                          <div className="cart-book-image">
                          </div>
                          <div className="cart-book-title">{book.title}</div>
                          <div className="cart-book-price"></div>
                          <div className="cart-book-quantity">
                              <span className="quantity">{orderDetails.lineItems[index].quantity}</span>&nbsp;
                          </div>
                          <div
                              className="cart-book-subtotal">${orderDetails.lineItems[index].quantity * book.price}</div>
                          <ul>
                              <li className="line-sep"></li>
                          </ul>
                      </li>

                  ))}

              </ul>

          </div>
          <div className="total-money">
              <p className="quantity">Tax $10</p>
              <p>Total ${orderDetails.order.amount}</p>
          </div>


      </div>
  )
}

export default ConfirmationTable;