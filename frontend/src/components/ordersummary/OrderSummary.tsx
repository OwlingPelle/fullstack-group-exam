import type { OrderLineType } from "../../types/payment.types";
import "./ordersummary.css";

// The box with the dishes in the order and the total price
type PropType = {
    orderLines : OrderLineType[];
    total : number;
};

const OrderSummary = ({ orderLines, total } : PropType) => {
    return (
        <section className="order-summary">
            <h2 className="order-summary__title">Your order</h2>

            <ul className="order-summary__list">
                {
                    orderLines.map((line) => (
                        <li key={ line.id } className="order-summary__row">
                            <span>{ line.name } × { line.quantity }</span>
                            <span className="order-summary__price">
                                { line.price * line.quantity } kr
                            </span>
                        </li>
                    ))
                }
            </ul>

            <div className="order-summary__total">
                <span>Total incl. VAT</span>
                <span className="order-summary__total-price">{ total } kr</span>
            </div>
        </section>
    );
};

export default OrderSummary;
