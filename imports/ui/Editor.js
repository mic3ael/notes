import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import PropTypes from 'prop-types';
import {Notes} from '../api/notes';
import {Meteor} from 'meteor/meteor';
import {browserHistory} from 'react-router';

export class Editor extends Component {
  constructor(props) {
    super(props);

    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleRemoval = this.handleRemoval.bind(this);

    this.state = {
      title: '',
      body: ''
    };
  }
  handleTitleChange(e) {
    const title = e.target.value;
    this.props.call('notes.update', this.props.note._id, {title});
    this.setState({title});
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.props.call('notes.update', this.props.note._id, {body});
    this.setState({body});
  }
  handleRemoval() {
    this.props.call('notes.remove', this.props.note._id);
    this.props.browserHistory.push('/dashboard');
  }
  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note
      ? this.props.note._id
      : undefined;
    const prevNoteId = prevProps.note
      ? prevProps.note._id
      : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId) {
      const {title, body} = this.props.note;
      this.setState({title, body});
    }
  }
  render() {
    if (this.props.note)
      return (
        <div>
          <input type="text" value={this.state.title} placeholder="Untitled Note" onChange={this.handleTitleChange}/>
          <textarea value={this.state.body} placeholder="Your note here" onChange={this.handleBodyChange}></textarea>
          <button onClick={this.handleRemoval}>Delete Note</button>
        </div>
      );

    return (
      <p>{this.props.selectedNoteId
          ? 'Note not found.'
          : 'Pick or create a note to get started'}</p>
    );
  }
}

Editor.propTypes = {
  note: PropTypes.object,
  selectedNoteId: PropTypes.string,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {selectedNoteId, note: Notes.findOne(selectedNoteId), call: Meteor.call, browserHistory};
}, Editor);
