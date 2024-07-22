import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { convertDate } from '../../helpers/helpers';
import { MeterType } from '../../store/MeterModel';
import { useStore } from '../../store/RootStore';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import './MetersTable.scss';

const MetersTable = (): JSX.Element => {
  const rootStore = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const toMeterInfo = (meter: MeterType) => {
    return {
      id: meter.id,
      type: meter._type[0],
      is_automatic: meter.is_automatic,
      description: meter.description,
      installation_date: convertDate(meter.installation_date),
      initial_values: meter.initial_values,
      address: findAddress(meter.area.id),
    };
  };
  const meters = rootStore.meters.map((meter) => toMeterInfo(meter));

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      await rootStore.fetchMeters();
      await rootStore.fetchAddresses();
      setIsLoading(false);
    })();
  }, [rootStore.currentPage, rootStore.meters.length]);

  function findAddress(id: string) {
    if (rootStore.address) {
      const address = rootStore.address.find((adress) => adress?.id === id);
      const street = address?.house.address;
      const app = address?.str_number_full;
      return (
        <span>
          {street}, {app}
        </span>
      );
    }
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <td>№</td>
            <td>Тип</td>
            <td>Дата установки</td>
            <td>Автоматический</td>
            <td>Текущие показания</td>
            <td>Адрес</td>
            <td>Примечание</td>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td className="loader-wrapper" colSpan={7}>
                <Loader />
              </td>
            </tr>
          ) : (
            meters?.map((meter, i) => (
              <tr key={meter.id}>
                <th>
                  {rootStore.currentPage === 1
                    ? i + 1
                    : i + 1 + rootStore.currentPage * 20 - 20}
                </th>
                <td>
                  {meter.type === 'ColdWaterAreaMeter' ? (
                    <span className="water-type">
                      <img src="./../img/cold.svg" alt="холодная вода" /> ХВС
                    </span>
                  ) : (
                    <span className="water-type">
                      <img src="./../img/hot.svg" alt="Горячая вода" /> ГВС
                    </span>
                  )}
                </td>
                <td>{meter.installation_date}</td>
                <td>{meter.is_automatic ? 'да' : 'нет'}</td>
                <td>{meter.initial_values}</td>
                <td>{meter.address}</td>
                <td>
                  <div className="delete-btn-wrapper">
                    {meter.description}
                    <button
                      className="delete-btn"
                      onClick={() => rootStore.removeMeter(meter.id)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="#C53030"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7.33331 6.00002V12H5.99998V6.00002H7.33331Z" />
                        <path d="M9.99998 6.00002V12H8.66665V6.00002H9.99998Z" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.85281 0.666687H11.1472L11.8138 2.66669H14.6666V4.00002H13.3333L12.6666 15.3334H3.33331L2.66665 4.00002H1.33331V2.66669H4.18614L4.85281 0.666687ZM5.5916 2.66669H10.4084L10.1861 2.00002H5.81382L5.5916 2.66669ZM3.99998 4.00002L4.66665 14H11.3333L12 4.00002H3.99998Z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="table-footer">
        <Pagination />
      </div>
    </div>
  );
};

export default observer(MetersTable);
