import { MeterType } from '../store/MeterModel';

export function filterIds(
  currentIds: { id__in: string[] },
  meters: MeterType[]
) {
  let setIds = new Set(currentIds.id__in);
  for (let meter of meters) {
    setIds.add(meter['area']['id']);
  }
  return Array.from(setIds);
}

export function convertDate(date: string) {
  const [year, month, dayAndTime] = date.split('-');
  const day = dayAndTime.slice(0, 2);
  return `${day}.${month}.${year}`;
}
