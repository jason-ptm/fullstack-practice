import moment from 'moment';

export const momentInSpanish = (date: string) => {
  return moment.locale('es');
};
