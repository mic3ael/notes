import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import PropTypes from 'prop-types';
import {Notes} from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NodeListEmptyItem';

export const NoteList = (props) => {
  return (
    <div className="item-list">
      <NoteListHeader/> {props.notes.length > 0
        ? props.notes.map(note => <NoteListItem key={note._id} note={note}/>)
        : <NoteListEmptyItem/>}
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  Meteor.subscribe('notes');

  return {
    notes: Notes.find({}, {
      sort: {
        updatedAt: -1
      }
    }).fetch().map(note => {
      return {
        ...note,
        selected: note._id === selectedNoteId
      };
    })
  };
}, NoteList);
