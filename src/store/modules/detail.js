import { requestDetail, requestLongComment, requestShortComment } from "../../util/request"

//state 
const init = {
    detail: {},
    longComment: {},
    shortComment: {}
}

//action 
export const changeDetailAction = detail => ({
    type: "changeDetail",
    detail
})
export const changelongCommentAction = longComment => ({
    type: "changelongComment",
    longComment
})
export const changeshortCommentAction = shortComment => ({
    type: "changeshortComment",
    shortComment
})
export const requestDetailAction = id => {
    return (dispatch, getState) => {
        const { detail } = getState().detail;
        if (detail.id === id) {
            return;
        } else {
            dispatch(changeDetailAction({}))
        }
        requestDetail(id).then(res => {
            dispatch(changeDetailAction(res.data))
        })
    }
}
export const requestlongCommentAction = id => {
    return (dispatch, getState) => {
        const { longComment } = getState().detail;
        if (longComment.id === id) {
            return;
        } else {
            dispatch(changelongCommentAction({}))
        }
        requestLongComment(id).then(res => {
            dispatch(changelongCommentAction(res.data))
        })
    }
}
export const requestshortCommentAction = id => {
    return (dispatch, getState) => {
        const { shortComment } = getState().detail;
        if (shortComment.id === id) {
            return;
        } else {
            dispatch(changeshortCommentAction({}))
        }
        requestShortComment(id).then(res => {
            dispatch(changeshortCommentAction(res.data))
        })
    }
}

//reducer 
const reducer = (state = init, action) => {
    switch (action.type) {
        case "changeDetail":
            return {
                ...state,
                detail: action.detail
            }
        case "changelongComment":
            return {
                ...state,
                longComment: action.longComment
            }
        case "changeshortComment":
            return {
                ...state,
                shortComment: action.shortComment
            }
        default:
            return state;
    }
}

//reselector
export const getDetail = state => state.detail.detail;
export const getlongComment = state => state.detail.longComment;
export const getshortComment = state => state.detail.shortComment;
export const getIsCollect=state=>{
    return state.collection.some(item=>TimeRanges.id===state.detail.id)
}
export default reducer