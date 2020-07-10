import React, { Component } from 'react'
import { connect } from "react-redux"
import { requestshortCommentAction, getshortComment } from "../../store/modules/shortcomment"
import { requestlongCommentAction, getlongComment } from "../../store/modules/longcomment"
import { filterTime, getJsonLength } from "../../util/filter"
import { Accordion, List } from 'antd-mobile';
import GoBack from "../../components/GoBack/GoBack"
import "./comment.css"
import noneimg from "../../assets/img/nonecomment.png"
class Comment extends Component {
  constructor() {
    super()
    this.state = {}
  }
  // -----加载长短评论---------
  componentDidMount() {
    var id = this.props.match.params.id;
    this.props.requestlongCommentAction(id);
    this.props.requestshortCommentAction(id);
  }
  render() {
    const { longComment,shortComment } = this.props
    return (
      <div className="comment">
        {/*----- 头部---- */}
        <header className="comment-header">
          <GoBack></GoBack>
          <span>{getJsonLength(longComment.comments) + getJsonLength(shortComment.comments) + "条评论"}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="right iconfont icon-xiepinglun"></span>
        </header>
        {/*----- 主体----- */}
        <div style={{ marginTop: 0, marginBottom: 10 }}>
          <Accordion accordion openAnimation={{}} defaultActiveKey="0" className="my-accordion">
            {/* ---长评论--- */}
            <Accordion.Panel header={getJsonLength(longComment.comments) + "条长评论"}>
              <List className="my-list">
                {getJsonLength(longComment.comments) !== 0 ? longComment.comments.map(item => {
                  return (
                    <List.Item key={item.id}>
                      <div className="comment-name">{item.author}</div>
                      <p className="comment-content">{item.content}</p>
                      <div className="comment-avatar"><img src={item.avatar} alt="" /></div>
                      <p className="comment-time">{filterTime(item.time)}</p>
                    </List.Item>
                  )
                }) : <div className="noneimg"><img src={noneimg} alt="" /></div>}
              </List>
            </Accordion.Panel>
            {/* ---短评论--- */}
            <Accordion.Panel header={getJsonLength(shortComment.comments) + "条短评论"}>
              <List className="my-list">
                {getJsonLength(shortComment.comments) !== 0 ? shortComment.comments.map(item => {
                  return (
                    <List.Item key={item.id}>
                      <div className="comment-name">{item.author}</div>
                      <p className="comment-content">{item.content}</p>
                      <div className="comment-avatar"><img src={item.avatar} alt="" /></div>
                      <p className="comment-time">{filterTime(item.time)}</p>
                    </List.Item>
                  )
                }) : <div className="noneimg"><img src={noneimg} alt="" /></div>}
              </List>
            </Accordion.Panel>
          </Accordion>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state.detail)
  return {
      longComment:getlongComment(state),
      shortComment: getshortComment(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
      requestlongCommentAction:id=>dispatch(requestlongCommentAction(id)),
      requestshortCommentAction:id=>dispatch(requestshortCommentAction(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment);