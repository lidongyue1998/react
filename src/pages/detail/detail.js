import React, { Component } from 'react';
import GoBack from "../../components/GoBack/GoBack"
import { getJsonLength } from "../../util/filter"
import { connect } from "react-redux"
import { getDetail, requestDetailAction ,getshortComment,requestlongCommentAction,getlongComment,requestshortCommentAction} from "../../store/modules/detail"
import { collectAction, cancelAction, getIsCollect } from "../../store/modules/collections"
import fenxiang from "../../assets/img/fenxiang.png"
import "./detail.css"
class Detail extends Component {
    constructor() {
        super()
        this.state = {
            isShow: false,
            isgood: false,
        }
        this.con = React.createRef()
    }
    // -----加载---------
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.requestDetailAction(id);  
        this.props.requestlongCommentAction(id);
        this.props.requestshortCommentAction(id);
    }
    // -----去评论页-------
    toComment(id) {
        this.props.history.push(`/comments/${id}`)
    }
    //-----点赞------
    good() {
        this.setState({
            isgood: true
        })
        console.log("点赞成功")
    }
    //-----取消点赞------
    nogood() {
        this.setState({
            isgood: false
        })
        console.log("取消点赞成功")
    }
    // -----分享----------
    maskClick(e) {
        if (e.target.className === "mask") {
            this.toggle(false);
        }
    }
    conClick(e) {
        e.stopPropagation()
    }
    toggle(bool) {
        this.setState({
            isShow: bool
        })
    }
    // -----主体----------
    render() {
        const {isShow,  isgood } = this.state;
        const { detail,longComment,shortComment, collectAction, cancelAction ,isCollect} = this.props
        if (this.con.current && detail.body) {
            this.con.current.innerHTML = detail.body;
        }
        return (
            <div className="detail">
                {/* ----头部---- */}
                <header className="detail-header">
                    <GoBack></GoBack>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="iconfont icon-fenxiang" onClick={() => this.toggle(true)}></span>
                    {isCollect ? <span className="iconfont icon-shoucang red" onClick={() => cancelAction(detail.id)}></span>
                        : <span className="iconfont icon-shoucang" onClick={() => collectAction(detail)}></span>}
                    <span className="iconfont icon-pinglun" onClick={() => { this.toComment(detail.id) }}>{getJsonLength(longComment.comments)+getJsonLength(shortComment.comments)}</span>
                    {isgood ? <span className="iconfont icon-dianzan redgood" onClick={() => this.nogood()}></span>
                        : <span className="iconfont icon-dianzan" onClick={() => this.good()}></span>}
                </header>
                {
                    isShow ? (
                        <div className="mask" onClick={(e) => this.maskClick(e)}>
                            <div className="con" >
                                <img src={fenxiang} alt="" />
                            </div>
                        </div>
                    ) : null
                }
                {detail.css ? <link rel="stylesheet" href={detail.css[0]} /> : null}
                <div className="bigimg"><img src={detail.images} alt="" /></div>
                <div ref={this.con}></div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        detail: getDetail(state),
        longComment:getlongComment(state),
        shortComment: getshortComment(state),
        isCollect: getIsCollect(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        requestDetailAction: (id) => dispatch(requestDetailAction(id)),
        collectAction: (detail) => dispatch(collectAction(detail)),
        cancelAction: id => dispatch(cancelAction(id)),
        requestlongCommentAction:id=>dispatch(requestlongCommentAction(id)),
        requestshortCommentAction:id=>dispatch(requestshortCommentAction(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
