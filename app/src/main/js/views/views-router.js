import React from 'react';
import {
  Route,
  BrowserRouter,
} from 'react-router-dom';

import { RouterScrollToTop } from './router-scroll-to-top';
import { BaseView } from './base-view';

class ViewsRouter extends React.Component {
  static propTypes = {};

  constructor() {
    super();
  }

  render() {
    return (
      <BrowserRouter>
        <RouterScrollToTop>
          <Route path="/" component={BaseView}/>
        </RouterScrollToTop>
      </BrowserRouter>
    );
  }
}

export { ViewsRouter };
