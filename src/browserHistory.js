import {createBrowserHistory} from 'history';

export const browserHistory = (typeof window === 'undefined') ? {push: () => ''} : createBrowserHistory();
