import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import Loading from '../components/Loading';
import { AUTH_PREFIX_PATH } from '../configs/AppConfig'

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="page"/>}>
        <Route path={`${AUTH_PREFIX_PATH}`} component={lazy(() => import(`../views/Index`))} />
    </Suspense>
  )
}

export default AppViews;

