import ConfirmationTable from "./ConfirmationTable";
import {useContext} from "react";
import {OrderStore} from "../contexts/OrderContext";
import '../assets/css/ConfirmationPage.css';
import {Link, useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";

function ConfirmationPage() {
    const {orderDetails, dispatch} = useContext(OrderStore);
    const navigate = useNavigate();

    const orderDate = () => {
        let date = new Date(orderDetails.order.dateCreated);
        return (date.toLocaleString());
    };
    const ccExpDate = (): Date => {
        return new Date(orderDetails.customer.ccExpDate);
    };

    function displayCreditCard(ccNumber: string) {
        ccNumber = ccNumber.replace(/ /g, "").replace(/-/g, "");
        const visiblePart = ccNumber.slice(-4);
        return `**** **** **** ${visiblePart}`;
    }

    function formatMonth(month: number) {
        return month < 10 ? `0${month}` : month.toString();
    }

    return (
        <div>
            {!orderDetails || !orderDetails.order ? (
                <>
                    <div className="center-text">
                        <p>We are sorry, the order you requested could not be found. </p>
                    </div>
                    <div className="center-text">
                        <button className="white-border-gray-bg" onClick={() => navigate('/')}>Go to
                            Home Page
                        </button>
                    </div>
                </>
            ) : (
                <div className="confirmationView">
                    <ConfirmationTable/>
                    <ul className="custoinformation">
                        <li className="cust-head"><b></b>CUSTOMER INFORMATION</li>
                        <li><b>Name:</b> {orderDetails?.customer?.customerName}</li>
                        <li><b>Address:</b> {orderDetails?.customer?.address}</li>
                        <li><b>Email:</b> {orderDetails?.customer?.email}</li>
                        <li><b>Phone:</b>{orderDetails?.customer?.phone}</li>
                        <li><b>Credit Card:</b>{displayCreditCard(orderDetails?.customer?.ccNumber)}(
                            {formatMonth(1 + new Date(orderDetails.customer.ccExpDate).getUTCMonth())}/{formatMonth(new Date(orderDetails.customer.ccExpDate).getUTCFullYear())})
                        </li>
                    </ul>
                    <div className="shopping-buttons">
                        <Link to={`/`}>
                            <button className="continue-shopping-button">
                                <FontAwesomeIcon icon={faArrowLeft} className="arrow-icon"/>
                                &nbsp; CONTINUE SHOPPING
                            </button>
                        </Link>

                    </div>
                    <div id="customerInfo">
                        <li></li>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ConfirmationPage;