import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';

export const NoteListItem = (props) => {
  return (
    <div onClick={() => {
      props.Session.set('selectedNoteId', props.note._id);
    }}>
      <h5>{props.note.title || 'Untitled note'}</h5>
      <p>{moment(props.note.updatedAt).format('DD/M/YY')}</p>
    </div>
  );
}

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(() => {
  return {Session};
}, NoteListItem);