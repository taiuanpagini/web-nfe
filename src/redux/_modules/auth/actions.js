export function signInRequest(user, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { user, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signUpRequest(
  name,
  email,
  phone,
  start_hour,
  end_hour,
  start_lunch,
  end_lunch,
  interval,
  address,
  password
) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: {
      name,
      email,
      phone,
      start_hour,
      end_hour,
      start_lunch,
      end_lunch,
      interval,
      address,
      password,
    },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
