import { combineReducers } from 'redux';

import jobReducer from './jobReducer';
import projectReducer from './projectReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    jobs: jobReducer,
    projects: projectReducer,
    user: userReducer
});

export default rootReducer;