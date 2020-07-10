import React, { Component } from 'react';

function asyncC(fn) {
    class asyncComponent extends Component {
        constructor() {
            super()
            this.state = {
                C: null
            }
        }
        componentDidMount() {
            fn().then(mod => {
                this.setState({
                    C: mod.default
                })
            })
        }
        render() {
            const { C } = this.state
            return (
                <div>
                    {C ? <C {...this.props}></C> : null}
                </div>
            );
        }
    }

    return asyncComponent;
}
export default asyncC
