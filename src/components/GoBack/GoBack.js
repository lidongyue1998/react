import React, { Component } from 'react'
import {withRouter} from "react-router-dom"
class GoBack extends Component {
    goBack(){
        this.props.history.goBack()
    }
    render() {
        return (
            <span onClick={()=>this.goBack()} className="iconfont icon-fanhui"></span>
        )
    }
}
export default withRouter(GoBack)