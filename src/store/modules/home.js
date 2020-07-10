import { requestIndex, requestOld } from "../../util/request"
//state 
const init = {
    banner: [],//轮播图状态
    list: [],
    n: 0,
    isRequest: true
}

//action 
//修改banner的action
export const changeBannerAction = arr => ({
    type: "changeBanner",
    arr
})

//修改list的action
export const changeListAction = day => ({
    type: "changeList",
    day
})
//修改n的action
export const changeNAction = () => ({
    type: "changeN"
})

//修改isRequest
export const changeIsRequestAction = bool => ({
    type: "changeIsRequest",
    bool
})
//获取banner和今日新闻的action 
export const requestNewsAction=()=>{
    return (dispatch,getState)=>{
        const {list}=getState().home
        if(list.length>0){
            return;
        }
        //发起请求
        requestIndex().then(res=>{
            //修改banner 
            dispatch(changeBannerAction(res.data.top_stories))

            //修改list 
            dispatch(changeListAction({
                time:"今日新闻",
                data:res.data.stories
            }))
        })
    }
}
//获取以前新闻
export const requestBeforeAction = () => {
    return (dispatch, getState) => {
        const { n } = getState().home;
        var time = getTime(n);
        requestOld(time.params).then(res => {
            dispatch(changeIsRequestAction(true))
            dispatch(changeListAction({
                time: time.show,
                data: res.data.stories
            }))
        })
    }
}
//时间
const getTime = (n) => {
    var showDate = new Date(new Date().getTime() - n * 24 * 60 * 60 * 1000);//展示的时间对象
    var paramsDate = new Date(new Date().getTime() - (n - 1) * 24 * 60 * 60 * 1000);//发起请求的参数时间对象
    var showM = (showDate.getMonth() + 1 + "").padStart(2, '0')
    var showD = (showDate.getDate() + "").padStart(2, '0')
    var showTime = showM + "月" + showD + "日";
    var paramsY = paramsDate.getFullYear()
    var paramsM = (paramsDate.getMonth() + 1 + "").padStart(2, '0')
    var paramsD = (paramsDate.getDate() + "").padStart(2, '0')
    var paramsTime = paramsY + paramsM + paramsD

    return {
        show: showTime,
        params: paramsTime
    }
}

//reducer 
const reducer = (state = init, action) => {
    switch (action.type) {
        //修改banner
        case "changeBanner":
            return {
                ...state,
                banner: action.arr
            }
        //修改list 
        case "changeList":
            return {
                ...state,
                list: [...state.list, action.day]
            }
            //修改n
        case "changeN":
            return {
                ...state,
                n: state.n + 1
            }
        //修改isRequest
        case "changeIsRequest":
            return {
                ...state,
                isRequest: action.bool
            }
        default:
            return state;
    }
}

//导出状态
//导出banner 
export const getBanner = state => state.home.banner;
//导出list 
export const getList = state => state.home.list;
//导出isRquest 
export const getIsRequest = state => state.home.isRequest
//导出reducer 
export default reducer