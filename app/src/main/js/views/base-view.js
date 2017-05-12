import React from 'react';
import { Switch, Route, withRouter, Link } from "react-router-dom";

import { ShortPage } from "./short-page";
import { LongPage } from "./long-page";

class BaseView extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
  };

  constructor() {
    super();
  }

  render() {
    return (
      <Switch>
        <Route path="/short-page" component={ShortPage}/>
        <Route path="/long-page" component={LongPage}/>
        <Route path="/" render={() => {
          return (
            <div style={{ backgroundColor: "#b96" }}>
              <h1>Base view</h1>

              <p>
              This simulates a long page with a lot of content. Scroll down to find the links to two sub pages.
              </p>

              <ul>
                <li>
                  One page with short content. When navigating back:
                  <ul>
                    <li>
                      <span style={{backgroundColor: "red"}}>Chrome Version 58.0.3029.110 (64-bit): Scroll Restoration does NOT work</span>
                    </li>
                    <li>
                      <span style={{ backgroundColor: "green" }}>Firefox Version 53.0.2 (64-bit): Scroll Restoration works properly</span>
                    </li>
                    <li>
                      <span style={{ backgroundColor: "green" }}>Safari Version 10.1 (12603.1.30.0.34): Scroll Restoration works properly</span>
                    </li>
                    <li>
                      <span style={{backgroundColor: "red"}}>Opera Version 45.0.2552.635 (64-bit): Scroll Restoration does NOT work</span>
                    </li>
                    <li>
                      <span style={{backgroundColor: "green"}}>Microsoft Edge Version 38.14393.1066.0 (64-bit): Scroll Restoration works properly</span>
                    </li>
                  </ul>
                </li>
                <li>
                  One page with long content. When navigating back:
                  <ul>
                    <li>
                      <span style={{backgroundColor: "green"}}>Chrome Version 58.0.3029.110 (64-bit): Scroll Restoration works properly</span>
                    </li>
                    <li>
                      <span style={{ backgroundColor: "green" }}>Firefox Version 53.0.2 (64-bit): Scroll Restoration works properly</span>
                    </li>
                    <li>
                      <span style={{ backgroundColor: "green" }}>Safari Version 10.1 (12603.1.30.0.34): Scroll Restoration works properly</span>
                    </li>
                    <li>
                      <span style={{backgroundColor: "green"}}>Opera Version 45.0.2552.635 (64-bit): Scroll Restoration works properly</span>
                    </li>
                    <li>
                      <span style={{backgroundColor: "green"}}>Microsoft Edge Version 38.14393.1066.0 (64-bit): Scroll Restoration works properly</span>
                    </li>
                  </ul>
                </li>
              </ul>
              Scroll down to find the links. &#x25BC; &#x25BC; &#x25BC; &#x25BC;
              <p style={{ marginTop: "150vh" }}>
                <Link to="/short-page">To short page</Link>
              </p>
              <p>
                <Link to="/long-page">To long page</Link>
              </p>
            </div>
          );
        }}/>
      </Switch>
    );
  }
}

const routed = withRouter(BaseView);

export { routed as BaseView };
