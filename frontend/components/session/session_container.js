import { connect } from 'react-redux';
import Session from './session';
import { login, signup } from '../../actions/session_actions';
import { clearErrors } from '../../actions/error_actions';

const mapStateToProps = (state) => {
  const loggedIn = state.session.currentUser ? true : false;
  return { loggedIn, errors: state.errors };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let formType;
  let processForm;
  if (ownProps.location.pathname === '/login') {
    formType = 'login';
    processForm = (user) => ( dispatch(login(user)) );
  } else {
    formType = 'signup';
    processForm = (user) => ( dispatch(signup(user)) );
  }

  return {
    formType,
    processForm,
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Session);
