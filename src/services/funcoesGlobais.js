import Moment from 'moment';

export const FormataFone = (fone) => {
  if (fone != null && fone.length > 0) {
    fone = fone.replace('(', '');
    fone = fone.replace(')', '');
    fone = fone.replace('-', '');
    fone = fone.replace(' ', '');
    if (fone.length === 11) {
      return (
        `(${fone.substring(0, 2)})` +
        ` ${fone.substring(2, 7)}-${fone.substring(7)}`
      );
    }
    return (
      `(${fone.substring(0, 2)})` +
      ` ${fone.substring(2, 6)}-${fone.substring(6)}`
    );
  }
  return '';
};

export const FormataData = (data) => {
  return Moment(data).format('DD/MM/YYYY');
};

export const FormataDataHora = (data) => {
  return Moment(data).format('DD/MM/YYYY HH:mm');
};

export const FormataHora = (data) => {
  return Moment(data).format('HH:mm');
};
