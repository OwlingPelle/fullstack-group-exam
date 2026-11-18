import "./backbutton.css";

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
            {/* An arrow pointing left. aria-hidden: screen readers skip it */}
            <svg
                className="back-button__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M15 5l-7 7 7 7" />
            </svg>
        </button>
    );
};

export default BackButton;
