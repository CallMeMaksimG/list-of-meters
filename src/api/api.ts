import queryString from 'query-string';
import { request } from '../http/request';

export async function getMeters(offset: number) {
  return (
    await request(
      `http://showroom.eis24.me/api/v4/test/meters/?limit=20&offset=${offset}`,
      {}
    )
  ).results;
}

export async function getAddress(searchParams: {}) {
  return (
    await request(
      `http://showroom.eis24.me/api/v4/test/areas/?${queryString.stringify(
        searchParams
      )}`,
      {}
    )
  ).results;
}

export async function remove(id: number) {
  return await request(`http://showroom.eis24.me/api/v4/test/meters/${id}`, {
    method: 'DELETE',
  });
}
