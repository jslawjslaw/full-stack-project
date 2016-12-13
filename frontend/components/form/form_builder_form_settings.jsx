import React from 'react';
import merge from 'lodash/merge';

class FormSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      private: "",
      choices: "",
      permanent_link: "",
      author_id: "",
      button: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

// Called on initial render
  componentWillReceiveProps(nextProps) {
    const button = (nextProps.currentForm.id) ?  "Update" : "Create";
    this.setState({
      title: nextProps.currentForm.title,
      description: nextProps.currentForm.description,
      private: nextProps.currentForm.private,
      choices: nextProps.currentForm.choices,
      permanent_link: nextProps.currentForm.permanent_link,
      author_id: nextProps.currentForm.author_id,
      button
    });
  }

// Called when moving to another tab and back
  componentDidMount() {
    const button = (this.props.currentForm.id) ?  "Update" : "Create";
    this.setState({
      title: this.props.currentForm.title,
      description: this.props.currentForm.description,
      private: this.props.currentForm.private,
      choices: this.props.currentForm.choices,
      permanent_link: this.props.currentForm.permanent_link,
      author_id: this.props.currentForm.author_id,
      button
    });
  }

  handleChange(e) {
    let newState = Object.assign({}, this.state);

    if (e.currentTarget.name === "title") {
      this.setState({ title: e.currentTarget.value });
    } else if (e.currentTarget.name === "description") {
      this.setState({ description: e.currentTarget.value });
    } else if (e.currentTarget.name === "private") {
      let value;
      if (e.currentTarget.value === "false") {
        value = false;
      } else {
        value = true;
      }
      this.setState({ private: value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = {
      title: this.state.title,
      description: this.state.description,
      author_id: this.state.author_id,
      permanent_link: this.state.permanent_link,
      private: this.state.private,
      id: this.props.currentForm.id
    };

    if (this.state.button === "Create") {
      if (!this.state.private) {
        form.private = false;
      }
      if (!this.state.author_id) {
        form.author_id = this.props.userId;
      }
      this.props.createForm(form, this.props.router).then((action) => {
        action.router.push(`/build/${ action.currentForm.id }`)
      });
    } else {
      this.props.updateForm(form);
    }
  }

  render() {
    return (
      <form className="form-settings-pane">
        <label className="form-settings-label">Form Name
          <input
            className="form-settings-input-text"
            type="text"
            name="title"
            onChange={ this.handleChange }
            value={ this.state.title } />
        </label>
        <label className="form-settings-label">Description
          <input
            className="form-settings-input-textarea"
            type="textarea"
            name="description"
            onChange={ this.handleChange }
            value={ this.state.description } />
        </label>
        <fieldset className="privacy-fieldset">
          <legend className="privacy-legend">Privacy Options</legend>
          <input
            className="form-settings-radio"
            type="radio"
            name="private"
            value={ false }
            checked={ !this.state.private }
            onChange={ this.handleChange }/><span className="radio-label"> Public</span>
            <br />
            <input
              className="form-settings-radio"
              type="radio"
              name="private"
              value={ true }
              checked={ this.state.private }
              onChange={ this.handleChange }/><span className="radio-label"> Private</span>
          </fieldset>
          <button
            className="form-settings-button"
            onClick={ this.handleSubmit }>{ this.state.button }</button>
      </form>
    );
  }
}

export default FormSettings;
