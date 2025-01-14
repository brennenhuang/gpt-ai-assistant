import {
  afterEach,
  beforeEach,
  expect,
  test,
} from '@jest/globals';
import {
  getSession, handleEvents, removeSession, settings,
} from '../app/index.js';
import { COMMAND_SETTINGS } from '../constants/command.js';
import storage from '../storage/index.js';
import { createMessageEvents, TIMEOUT, USER_ID } from './utils.js';

beforeEach(() => {
  storage.initialize(settings);
});

afterEach(() => {
  removeSession(USER_ID);
});

test('COMMAND_SETTINGS', async () => {
  const events = [
    ...createMessageEvents([`${COMMAND_SETTINGS.text}`]),
  ];
  let results;
  try {
    results = await handleEvents(events);
  } catch (err) {
    console.error(err);
  }
  expect(getSession(USER_ID).lines.length).toEqual(1 * 2);
  const replies = results.map(({ messages }) => messages.map(({ altText }) => altText));
  expect(replies).toEqual(
    [
      ['設定'],
    ],
  );
}, TIMEOUT);
