import { createBrowserHistory } from 'history';

// In most cases, We don't have to explicity define the history object, as it is defined automatically by 'react-location. But for certain cases we may need it. So we explicity provide it.
export const routerHistory = createBrowserHistory();
export default routerHistory;
