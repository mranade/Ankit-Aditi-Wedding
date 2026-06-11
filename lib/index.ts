import people from '../data/people.json';

export const peopleIndex = people.map((p:any) => ({
  ...p,
  normName: p.name.toLowerCase().trim()
}));