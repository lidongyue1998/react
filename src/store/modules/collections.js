//state 
const init = {
    collections: []
}

//action
export const collectAction = detail => ({
    type: "collect",
    detail
})
export const cancelAction = id => ({
    type: "cancel",
    id
})

//reducer 
const reducer = (state = init, action)=>{
    const {collections}=state;
    switch (action.type) {
        case "collect":
            collections.push(action.detail)
            return {
                ...state,
                collections: [...collections]
            }
        case "cancel":
            const idx = collections.findIndex(item => item.id === action.id);
            collections.splice(idx, 1)
            return {
                ...state,
                collections: [...collections]
            }
        default:
            return state
    }
}



export default reducer;

//reselector

export const getCollections = state => state.collections.collections
export const getIsCollect = state => {
    const { detail } = state.detail;
    const { collections } = state.collections;
    return collections.some(item => item.id === detail.id)
}
