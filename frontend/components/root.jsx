import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';
import App from './app';
import HomeContainer from './home/home_container';
import SessionContainer from './session/session_container';
import FormManagerContainer from './form/form_manager_container';
import FormBuildContainer from './form/form_build_container';
import { fetchForm } from '../util/form_api_util';
import FormContainer from './form/form_container';
import Submission from './submission/submission';
import ResultsViewContainer from './submission/results_view_container';

const Root = ({ store }) => {
  function ensureLoggedIn(_, replace) {
    const loggedIn = store.getState().session.currentUser;
    if (!loggedIn) {
      replace('/');
    }
  }

  function redirectIfLoggedIn(_, replace) {
    const currentUser = store.getState().session.currentUser;
    if (currentUser) {
      replace('/manager');
    }
  }

  function ensureLoggedInAndUserOwnsForm(location, replace, asyncDone) {
    const loggedIn = store.getState().session.currentUser;
    if (!loggedIn) {
      replace('/');
    }

    fetchForm(location.params.formId).then((form) => {
      if(store.getState().session.currentUser.id !== form.author_id) {
        replace('/manager');
      }
      asyncDone();
    });
  }

  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" onEnter={ redirectIfLoggedIn } component={ App }>
          <IndexRoute component={ HomeContainer } />
          <Route path="/login" component={ SessionContainer } />
          <Route path="/signup" component={ SessionContainer } />
        </Route>
        <Route path="/manager" onEnter={ ensureLoggedIn } component={ FormManagerContainer } />
        <Route path="/build/:formId" onEnter={ (loc, rep, async) => ensureLoggedInAndUserOwnsForm(loc, rep, async) } component={ FormBuildContainer } />
        <Route path="/build" onEnter={ ensureLoggedIn } component={ FormBuildContainer } />
        <Route path="/form/:token" component={ FormContainer }/>
        <Route path="/submission" component={ Submission }/>
        <Route path="/submissions/:formId" onEnter={ (loc, rep, async) => ensureLoggedInAndUserOwnsForm(loc, rep, async) } component={ ResultsViewContainer }/>
      </Router>
    </Provider>
  )
}

export default Root;
