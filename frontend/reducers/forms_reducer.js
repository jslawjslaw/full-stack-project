import { RECEIVE_FORMS, RECEIVE_FORM } from '../actions/form_actions';
import { RECEIVE_FIELDS, RECEIVE_FIELD } from '../actions/field_actions';
import merge from 'lodash/merge';

const _nullForms = Object.freeze({
  allForms: {},
  currentForm: {}
});

const FormsReducer = (state = _nullForms, action) => {
  Object.freeze(state);
  let newState;
  switch(action.type) {
    case RECEIVE_FORM:
      const currentForm = action.currentForm;
      newState = Object.assign({}, state);
      return merge({}, _nullForms, { currentForm, allForms: newState.allForms });
    case RECEIVE_FORMS:
      const allForms = action.forms;
      return merge({}, _nullForms, { allForms });
    case RECEIVE_FIELD:
      newState = Object.assign({}, state);
      newState.currentForm.fields.push(action.field)
      return newState;
    case RECEIVE_FIELDS:
      newState = Object.assign({}, state);
      newState.currentForm.fields = action.fields;
      return newState;
    default:
      return state;
  }
};

export default FormsReducer;
