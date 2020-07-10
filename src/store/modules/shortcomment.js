import {requestShortComment } from "../../util/request"

//state 
const init = {
    shortComment: {}
}

//action 
export const changeshortCommentAction = shortComment => ({
    type: "changeshortComment",
    shortComment
})
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
export const getshortComment = state => state.detail.shortComment;
export default reducer