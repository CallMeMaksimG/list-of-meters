import { cast, flow, Instance, types } from 'mobx-state-tree';
import { MeterModel } from './MeterModel';
import * as api from '../api/api';
import { AddressModel } from './AddressModel';
import { AddressQueryModel } from './AddressQueryModel';
import { filterIds } from '../helpers/helpers';

const RootStore = types
  .model('RootStore', {
    meters: types.array(MeterModel),
    address: types.array(AddressModel),
    addressQuery: AddressQueryModel,
    offset: types.number,
    currentPage: types.number,
  })
  .actions((self) => ({
    fetchMeters: flow(function* fetchMeters() {
      self.meters = yield api.getMeters(self.offset);
      self.addressQuery = cast({
        id__in: filterIds(self.addressQuery, self.meters),
      });
    }),
  }))
  .actions((self) => ({
    fetchAddresses: flow(function* fetchAddresses() {
      self.address = yield api.getAddress(self.addressQuery);
    }),
  }))
  .actions((self) => ({
    paginate(number: number) {
      self.currentPage = number;
      self.offset = (number - 1) * 20;
    },
  }))
  .actions((self) => ({
    removeMeter: flow(function* removeMeter(id) {
      yield fetch(`http://showroom.eis24.me/api/v4/test/meters/${id}`, {
        method: 'DELETE',
      });

      self.meters = cast(self.meters?.filter((meter) => meter.id !== id));
    }),
  }));

export type RootStoreType = Instance<typeof RootStore>;

let rootStore: RootStoreType;

export function useStore() {
  if (!rootStore) {
    rootStore = RootStore.create({
      addressQuery: { id__in: [] },
      offset: 0,
      currentPage: 1,
    });
  }
  return rootStore;
}
