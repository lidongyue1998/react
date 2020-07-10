import React, { Component } from 'react'
import "./Index.css"
import { Carousel } from "antd-mobile"
import { connect } from "react-redux"
import { getBanner, getList, requestNewsAction, changeNAction, requestBeforeAction, getIsRequest, changeIsRequestAction } from "../../store/modules/home"
import user from "../../assets/img/user.png"
class Index extends Component {
    constructor() {
        super()
        this.state = {
          open: false
        }
      }
    //----加载----
    componentDidMount() {
        //返回时保持原来位置
        let indexSt = parseFloat(localStorage.getItem("indexSt"))
        document.documentElement.scrollTop = indexSt;
        document.body.scrollTop = indexSt;
        const {
            requestNewsAction,
            changeIsRequestAction,
            changeNAction,
            requestBeforeAction
        } = this.props
        requestNewsAction();
        // 滚动
        window.onscroll = () => {
            //顶部标题改变
            var titles = document.querySelectorAll(".day-title");
            var header = document.querySelector(".shouye1")
            var arr = [];
            for (var i = 0; i < titles.length; i++) {
                arr.push(titles[i].getBoundingClientRect().top)
            }
            for (var j = 0; j < arr.length; j++) {
                if (arr[j] < header.clientHeight) {
                    header.innerHTML = titles[j].innerHTML;
                } else {
                    break;
                }
            }
            header.innerHTML = header.innerHTML === '今日新闻' ? '首页' : header.innerHTML
            //到底加载
            var wh = document.documentElement.clientHeight;
            var dh = document.documentElement.offsetHeight
            var st = document.documentElement.scrollTop || document.body.scrollTop;
            if (wh + st + 50 >= dh && this.props.isRequest) {
                changeIsRequestAction(false);
                changeNAction();
                requestBeforeAction()
            }
        }
    }
    //----销毁----
    componentWillUnmount() {
        window.onscroll = null;
        //记录滚动位置
        var st = document.documentElement.scrollTop || document.body.scrollTop;
        localStorage.setItem("indexSt", st)
        //将页面滚动到顶部
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }
    //----前往detail的方法
    toDetail(id) {
        this.props.history.push(`/detail/${id}`)
    }
    //----去收藏页的方法
    tocollection() {
        this.props.history.push(`/collection`)
    }
    //----侧边栏方法
    onOpenChange() {
        this.setState({
            open: !this.state.open
        })
    }
    myDrawerClick(e) {
        if (e.target.className === "myDrawer") {
            this.onOpenChange()
        }
    }
    //时间判断方法
    getTime(n) {
        var showDate = new Date(new Date().getTime() - n * 24 * 60 * 60 * 1000);
        var paramsDate = new Date(new Date().getTime() - (n - 1) * 24 * 60 * 60 * 1000);
        var showM = (showDate.getMonth() + 1 + "").padStart(2, '0')
        var showD = (showDate.getDate() + "").padStart(2, '0')
        var showTime = showM + "月" + showD + "日";
        var paramsY = paramsDate.getFullYear()
        var paramsM = (paramsDate.getMonth() + 1 + "").padStart(2, '0')
        var paramsD = (paramsDate.getDate() + "").padStart(2, '0')
        var paramsTime = paramsY + paramsM + paramsD
        return {
            showTime: showTime,
            paramsTime: paramsTime
        }
    }
    //----渲染-----
    render() {
        const { banner, list } = this.props
        return (
            <div className="index">
                {/*------- 头部 --------*/}
                <header className="index-header">
                    <span onClick={() => this.onOpenChange()} className="iconfont icon-caidan"></span>
                    <span className="shouye1">首页</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="iconfont icon-lingdang"></span>
                    <span className="iconfont icon-ziyuan"></span>
                </header>
                {/*------- 侧边栏 --------*/}
                <div className="myDrawer" onClick={(e) => this.myDrawerClick(e)} style={{ left: this.state.open ? '0px' : '-100vh' }}>
                    <div className="drawer-con">
                        <div className="top">
                            <div className="user"><img src={user} alt="" /></div>
                            <p className="username">李东岳</p>
                            <div className="sc" onClick={() => this.tocollection()}>
                                <span className="iconfont icon-shoucang"></span>&nbsp;&nbsp;&nbsp;
                                <span>我的收藏</span>
                            </div>
                            <div className="xz">
                                <span className="iconfont icon-xiazai"></span>&nbsp;&nbsp;&nbsp;
                                 <span>离线下载</span>
                            </div>
                        </div>
                        <div className="shouye" onClick={() => this.onOpenChange()}>
                            &nbsp;&nbsp;&nbsp;
                            <span className="iconfont icon-shouye"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>首页</span>
                        </div>
                    </div>
                </div>
                {/*------- banner图 --------*/}
                <Carousel>
                    {
                        banner.map(item => {
                            return (
                                <div key={item.id} className="banner-item"
                                >
                                    <img src={item.image} alt=""
                                        onLoad={() => {
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));

                                        }}
                                    />
                                    <div className="title">{item.title}</div>
                                </div>
                            )
                        })
                    }
                </Carousel>
                {/*------- 新闻主体 ---------*/}
                <div className="list">
                    {
                        list.map(day => {
                            return (
                                <div className="day" key={day.time}>
                                    <h3 className="day-title">{day.time}</h3>
                                    {
                                        day.data.map((item) => {
                                            return (
                                                <div className="news" key={item.id} onClick={() => this.toDetail(item.id)}>
                                                    <p>{item.title}</p>
                                                    <img src={item.images[0]} alt="" />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    console.log("=====state====")
    console.log(state)
    return {
        banner: getBanner(state),
        list: getList(state),
        isRequest: getIsRequest(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        requestNewsAction: () => dispatch(requestNewsAction()),
        changeNAction: () => dispatch(changeNAction()),
        requestBeforeAction: () => dispatch(requestBeforeAction()),
        changeIsRequestAction: bool => dispatch(changeIsRequestAction(bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)