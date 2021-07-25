const { TOGGLE_SPINNER } = require("../actionTypes")

export const toggleSpinner = () => {
    console.log("in spinner actions");
    return {
        type: TOGGLE_SPINNER,
    }
}
