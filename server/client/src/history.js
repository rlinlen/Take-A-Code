import { createBrowserHistory as createHistory } from "history";

const history = createHistory()
// Get the current location.
/* const location = history.location

// Listen for changes to the current location.
const unlisten = history.listen((location, action) => {
    //Do your logic here and dispatch if needed
    //console.log(action, location.pathname, location.state);
}) */

export default history;