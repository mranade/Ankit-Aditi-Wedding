import Fuse from 'fuse.js';
import people from '../data/people.json';

export const fuse = new Fuse(people as any, {
  keys: ['name'],
  threshold: 0.3,
  ignoreLocation: true
});