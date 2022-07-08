import { axiosApiInstance } from './axios';
import moment from 'moment';

const date = moment(new Date()).format('DD/MM/YYYY');

export class AppApi {
  static getCursOnDate() {
    return axiosApiInstance
      .get(`http://www.cbr.ru/scripts/XML_daily.asp`, {
        params: { date_req: date }
      })
      .then((r) => {
        return r.data;
      });
  }
}
