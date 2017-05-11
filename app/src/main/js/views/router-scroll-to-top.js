import React from "react";
import { withRouter } from "react-router";

// https://reacttraining.com/react-router/web/guides/scroll-restoration
class RouterScrollToTop extends React.Component {
    static propTypes = {
        // React router location object
        location: React.PropTypes.object,
        // Child props validation
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node,
        ]),
    };

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
    }
}

const routed = withRouter(RouterScrollToTop);

export { routed as RouterScrollToTop };
