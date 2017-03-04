import React from 'react';
import { Route, IndexRoute } from 'react-router';

import BasicLayout from '/imports/components/layout/BasicLayout.jsx';

import Hello from '/imports/components/Hello';

export default (
    <Route path="/">
        <Route component={BasicLayout}>
            <IndexRoute component={Hello} />
        </Route>
    </Route>
);
