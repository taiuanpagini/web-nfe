import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const {
      name,
      email,
      start_hour,
      end_hour,
      start_lunch,
      end_lunch,
      avatar_id,
      interval,
      address,
      ...rest
    } = payload.data;

    const profile = {
      name,
      email,
      start_hour,
      end_hour,
      start_lunch,
      end_lunch,
      avatar_id,
      interval,
      address,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, '/users', profile);

    toast.success('Perfil atualizado com sucesso!');

    const horarios = Array.from({ length: 48 }).map((v, i) => {
      const d = new Date();
      d.setUTCHours(0, 0, 0, 0);
      d.setMinutes(d.getMinutes() + interval * i);
      return d.toISOString().substr(11, 5);
    });

    const horariosDisponiveis = [];

    horarios.map((res) => {
      if (start_lunch !== '' && end_lunch !== '') {
        if (
          (res >= start_hour && res < start_lunch) ||
          (res <= end_hour && res >= end_lunch)
        ) {
          horariosDisponiveis.push(res);
        }
      } else if (res >= start_hour && res <= end_hour) {
        horariosDisponiveis.push(res);
      }
    });

    const { data } = response;

    data.horarios = horariosDisponiveis;

    yield put(updateProfileSuccess(data));
  } catch (err) {
    toast.error('Erro ao atualizar perfil, confira seus dados!');

    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
