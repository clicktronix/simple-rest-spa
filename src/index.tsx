import React from 'react';
import { render } from 'react-dom';

import { Core } from 'core/Core';
import * as serviceWorker from 'core/configureServiceWorker';
import 'shared/styles/main.scss';

render(<Core />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
