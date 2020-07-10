import React, { Component } from 'react';
import { connect } from "react-redux"
import { getJsonLength } from "../../util/filter"
import { getCollections } from "../../store/modules/collections"
import "./collection.css"
import user from "../../assets/img/user.png"
class Collection extends Component {
    constructor() {
        super()
        this.state = {}
    }
    //----前往detail的方法
    toDetail(id) {
        this.props.history.push(`/detail/${id}`)
    }
    //----去首页的方法
    toindex() {
        this.props.history.push("/index")
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
    //----渲染-----
    render() {
        const { collections } = this.props;
        return (
            <div className="collection">
                {/*------- 头部 --------*/}
                <header className="collection-header">
                    <span onClick={() => this.onOpenChange()} className="iconfont icon-caidan"></span>
                    <span>{getJsonLength(collections)}条收藏</span>
                </header>
                {/*------- 侧边栏 --------*/}
                <div className="myDrawer" onClick={(e) => this.myDrawerClick(e)} style={{ left: this.state.open ? '0px' : '-100vh' }}>
                    <div className="drawer-con">
                        <div className="top">
                            <div className="user"><img src={user} alt="" /></div>
                            <p className="username">李东岳</p>
                            <div className="sc" onClick={() => this.onOpenChange()}>
                                <span className="iconfont icon-shoucang"></span>&nbsp;&nbsp;&nbsp;
                                <span>我的收藏</span>
                            </div>
                            <div className="xz">
                                <span className="iconfont icon-xiazai"></span>&nbsp;&nbsp;&nbsp;
                                 <span>离线下载</span>
                            </div>
                        </div>
                        <div className="shouye" onClick={() => this.toindex()}>
                            &nbsp;&nbsp;&nbsp;
                            <span className="iconfont icon-shouye"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>首页</span>
                        </div>
                    </div>
                </div>
                {collections.map(item => {
                    return (
                        <div key={item.id} className="news" onClick={() => this.toDetail(item.id)}>
                            <div className="img"><img src={item.image} alt="" /></div>
                            <p>{item.title}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        collections: getCollections(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Collection);