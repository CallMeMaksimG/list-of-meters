import { types } from 'mobx-state-tree';

export const AddressModel = types.model('AddressModel', {
  id: types.identifier,
  number: types.number,
  str_number: types.string,
  str_number_full: types.string,
  house: types.model('House', {
    address: types.string,
    id: types.identifier,
    fias_addrobjs: types.array(types.string),
  }),
});
