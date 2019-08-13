import React from 'react';
import Loadable from 'react-loadable';
import ErrorPage from './Error/error';
import Loading from './Loading/Loading';

export const loadComponent = (component) => {
  const LoadingComponent = ({isLoading, error}) => {
    //Handle the loading state
    if (isLoading) {
      return <Loading/>;
    } else if (error) {
      //Handle the error state
      return <ErrorPage/>;
    } else {
      return null;
    }
  }

  const filepath = `${component}/${component}Input`;
  // console.log(filepath);

  return Loadable({
      loader: () => import(filepath),
      loading: LoadingComponent
  });

};

