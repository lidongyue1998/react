import axios from "axios"

//响应拦截
axios.interceptors.response.use(res => {
    console.log("这次请求的路径是：" + res.config.url)
    console.log(res)
    return res;
})
//首页
export const requestIndex = () => {
    return axios({
        url: "/api/4/stories/latest",
        method: "get"
    })
}
//获取之前的新闻
export const requestOld = (n) => {
    return axios({
        url: "/api/4/stories/before/"+n,
        method: "get",
    })
}
//详情页
export const requestDetail = (id) => {
    return axios({
        url: "/api/4/story/"+id,
        method: "get",
        params: {
            id
        }
    })
}
//长评论
export const requestLongComment = (id) => {
    return axios({
        url: "/api/4/story/"+id+"/long-comments",
        method: "get",
        params: {
            id
        }
    })
}
//短品论
export const requestShortComment = (id) => {
    return axios({
        url: "/api/4/story/"+id+"/short-comments",
        method: "get",
        params: {
            id
        }
    })
}