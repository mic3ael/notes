import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Notes} from '../api/notes';
import PropTypes from 'prop-types';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NodeListEmptyItem';

export const NoteList = (props) => {
  return (
    <div>
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
  Meteor.subscribe('notes');

  return {notes: Notes.find().fetch()};
}, NoteList);
