import { atom } from 'jotai';

const tasksAtom = atom([]);
const filterAtom = atom({ status: 'all', category: 'all', search: '' });
const loadingAtom = atom(false);
const selectedTaskAtom = atom(null);
const statsAtom = atom({ total: 0, completed: 0, pending: 0, overdue: 0 });

export { 
  tasksAtom, 
  filterAtom, 
  loadingAtom, 
  selectedTaskAtom, 
  statsAtom 
};
