/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="iHome"
      >
        <meta
          name="description"
          content="iHome - manage your home tasks"
        />
      </Helmet>
      <Switch>
        <Route
          exact
          path="/"
          component={HomePage}
        />
        <Route
          path=""
          component={NotFoundPage}
        />
      </Switch>
    </AppWrapper>
  );
}
