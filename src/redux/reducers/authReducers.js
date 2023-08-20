import {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from './actionTypes'

const initializeState = {
  first_name: '',
  last_name: '',
  phone_number: '',
  email: '',
  referrer: '',
  password: '',
  loading: false,
}

export const authReducerAction = (prevState = initializeState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...prevState,
        loading: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...prevState,
        loading: false,
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        referrer: payload.referrer,
        phone_number: payload.phone_number,
        password: payload.password,
      }
    case LOAD_PROFILE:
      return {
        ...prevState,
        email: payload.email,
      }
    case LOGIN_FAIL:
      return {
        first_name: null,
        last_name: null,
        email: null,
        referrer: null,
        phone_number: null,
        password: null,
      }

    default:
      return {
        ...prevState,
      }
  }
}
