import * as txml from 'txml';
import camelCase from 'lodash/camelCase';

const camelizeKeys = (obj: object) => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key])
      }),
      {}
    );
  }
  return obj;
};

export const parseXmlToJson = (xml: string) => {
  const arr = [];
  const json = txml.simplify(txml.parse(xml));
  const {
    ValCurs: { Valute }
  } = json;
  for (const data of Valute) {
    const obj = camelizeKeys(data);
    arr.push(obj);
  }
  return arr;
};
