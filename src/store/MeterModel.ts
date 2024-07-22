import { types, flow, Instance } from 'mobx-state-tree';

export const MeterModel = types.model('Meters', {
  id: types.identifier,
  _type: types.array(types.string),
  area: types.model('Area', {
    id: types.identifier
  }),
  is_automatic: types.maybeNull(types.boolean),
  communication: types.string,
  description: types.maybeNull(types.string),
  serial_number: types.maybeNull(types.string),
  installation_date: types.string,
  brand_name: types.maybeNull(types.string),
  model_name: types.maybeNull(types.string),
  initial_values: types.array(types.number)
}
)

export type MeterType = Instance<typeof MeterModel>;
