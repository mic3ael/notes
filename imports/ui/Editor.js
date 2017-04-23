import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import PropTypes from 'prop-types';
import {Notes} from '../api/notes';
import {Meteor} from 'meteor/meteor';

export class Editor extends Component {
  constructor(props) {
    super(props);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }
  handleTitleChange(e) {
    this.props.call('notes.update', this.props.note._id, {title: e.target.value});
  }
  handleBodyChange(e) {
    this.props.call('notes.update', this.props.note._id, {body: e.target.value});
  }
  render() {
    if (this.props.note)
      return (
        <div>
          <input type="text" value={this.props.note.title} placeholder="Untitled Note" onChange={this.handleTitleChange}/>
          <textarea value={this.props.note.body} placeholder="Your note here" onChange={this.handleBodyChange}></textarea>
          <button>Delete Note</button>
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
  selectedNoteId: PropTypes.string
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {selectedNoteId, note: Notes.findOne(selectedNoteId), call: Meteor.call};
}, Editor);
