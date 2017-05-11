import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { ViewsRouter } from "./views/views-router";

require('./main.css');

const target = document.getElementById("root");

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        target
    );
};

render(ViewsRouter);

// Enable hot reloading
// https://github.com/gaearon/react-hot-loader/tree/master/docs#migration-to-30
if (module.hot) {
    module.hot.accept('./views/views-router', () => {
        render(ViewsRouter);
    });
}
