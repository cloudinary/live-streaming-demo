import { types } from 'mobx-state-tree';
import { MainStore } from './models';
import actions from './actions';
import views from './views';

const store = types
  .model('MainStore', MainStore)
  .actions(actions)
  .views(views);

export default store;
