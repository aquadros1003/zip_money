import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from 'antd';

function RouteInterceptor({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: AUTH_PREFIX_PATH,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export const Views = (props) => {
  return (
      <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
          <Route path={AUTH_PREFIX_PATH}>
            <AuthLayout direction={direction} />
          </Route>
          <RouteInterceptor path="/dashboard">
            <AppLayout direction={direction} location={location}/>
          </RouteInterceptor>
        </Switch>
      </ConfigProvider>
  )
}


const mapStateToProps = ({ theme, auth }) => {
  const { locale, direction } =  theme;
  const { token } = auth;
  return { locale, direction, token }
};

export default withRouter(connect(mapStateToProps)(Views));