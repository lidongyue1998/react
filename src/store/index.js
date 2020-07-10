import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"

import home from "./modules/home"
import detail from "./modules/detail"
import collections from "./modules/collections"
import longComment from "./modules/longcomment"
import shortComment from "./modules/shortcomment"
const reducer = combineReducers({
    //key是模块的名称，value是该模块对应的reducer
    home,
    detail,
    collections,
    longComment,
    shortComment
})

const store = createStore(reducer, applyMiddleware(thunk))
export default store;