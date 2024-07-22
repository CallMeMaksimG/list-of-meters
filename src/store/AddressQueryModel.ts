import { types } from 'mobx-state-tree';

export const AddressQueryModel = types.model('AddressQueryModel', { id__in: types.array(types.string) })