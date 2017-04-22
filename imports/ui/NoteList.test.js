import React from 'react';
import expect from 'expect';
import {Meteor} from 'meteor/meteor';
import {mount} from 'enzyme';

import {NoteList} from './NoteList';

const notes = [
  {
    _id: '123abc1',
    title: 'Test title',
    body: '',
    updatedAt: 0,
    userId: 'userId1'
  }, {
    _id: '123abc2',
    title: 'Test2 title',
    body: '',
    updatedAt: 0,
    userId: 'userId2'
  }, {
    _id: '123abc3',
    title: 'Test3 title',
    body: '',
    updatedAt: 0,
    userId: 'userId3'
  }
];

if (Meteor.isClient) {
  describe('NoteList', function() {

    it('should render NoteListItem for each note', function() {
      const wrapper = mount(<NoteList notes={notes}/>);
      expect(wrapper.find('NoteListItem').length).toBe(notes.length);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });

    it('should render NoteListEmptyItem if zero notes', function() {
      const wrapper = mount(<NoteList notes={[]}/>);
      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
    });
  });
}
