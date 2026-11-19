import "./backbutton.css";
import Icon from "../Icon";

// The round button with an arrow at the top of a page.
// Used on the cart, payment and create account pages.
type PropType = {
    onClick : () => void;
    label : string; // what a screen reader says, since the button only shows an arrow
};

const BackButton = ({ onClick, label } : PropType) => {
    return (
        <button
            type="button"
            className="back-button"
            onClick={ onClick }
            aria-label={ label }
        >
            <Icon
                name="arrow-left"
                className="back-button__icon"
                aria-hidden="true"
            />
        </button>
    );
};

export default BackButton;
