import {  requestLongComment} from "../../util/request"

//state 
const init = { 
    longComment: {},
}

//action 
export const changelongCommentAction = longComment => ({
    type: "changelongComment",
    longComment
})
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

//reducer 
const reducer = (state = init, action) => {
    switch (action.type) {
        case "changelongComment":
            return {
                ...state,
                longComment: action.longComment
            }
        default:
            return state;
    }
}

//reselector
export const getlongComment = state => state.detail.longComment;
export default reducer