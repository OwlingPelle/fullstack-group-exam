import "./button.css";

// A big round button for the main actions in the app,
// e.g. "Pay", "Go to payment", "Log in" and "Create account".
type PropType = {
    text : string;
    onClick? : () => void;
    type? : "button" | "submit";
    form? : string; // the id of a form, if the button is outside that form
    disabled? : boolean;
    variant? : "primary" | "secondary"; // primary = orange, secondary = only a border
};

const Button = ({
    text,
    onClick,
    type = "button",
    form,
    disabled = false,
    variant = "primary",
} : PropType) => {
    return (
        <button
            type={ type }
            form={ form }
            className={ `button button--${ variant }` }
            onClick={ onClick }
            disabled={ disabled }
        >
            { text }
        </button>
    );
};

export default Button;
