import { useCallback, useEffect, useState } from 'react';
import {
  INVALID_PASSWORD_ERR,
  INVALID_EMAIL_ERR,
  PATTERN_EMAIL,
  INVALID_INPUT_LENGTH,
  PATTERN_URL,
  INVALID_URL,
} from '../utils/constants';

export const useFormAndValidation = (userData) => {
  const [values, setValues] = useState(userData);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [aboutError, setAboutError] = useState('');
  const [urlError, setUrlError] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (
      emailError ||
      passwordError ||
      nameError ||
      aboutError ||
      urlError ||
      values.email === '' ||
      values.password === '' ||
      values.name === '' ||
      values.about === '' ||
      values.avatar === '' ||
      values.link === ''
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [values, emailError, passwordError, nameError, aboutError, urlError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));

    if (name === 'undefined') {
      setEmailError('');
      setPasswordError('');
      setNameError('');
      setAboutError('');
      setUrlError('');
    } else {
      if (name === 'email') {
        if (!PATTERN_EMAIL.test(value) || value.length === 1 || value.length > 30) {
          setEmailError(INVALID_EMAIL_ERR);
        } else {
          setEmailError('');
        }
      }
      if (name === 'password') {
        if (value.length < 8) {
          setPasswordError(INVALID_PASSWORD_ERR);
        } else {
          setPasswordError('');
        }
      }
      if (name === 'name') {
        if (value.length < 2 || value.length > 30) {
          setNameError(INVALID_INPUT_LENGTH);
        } else {
          setNameError('');
        }
      }
      if (name === 'about') {
        if (value.length < 2 || value.length > 30) {
          setAboutError(INVALID_INPUT_LENGTH);
        } else {
          setAboutError('');
        }
      }
      if (name === 'avatar' || name === 'link') {
        if (!PATTERN_URL.test(value)) {
          setUrlError(INVALID_URL);
        } else {
          setUrlError('');
        }
      }
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newIsValid = false) => {
      setValues(newValues);
      setIsValid(newIsValid);
      setNameError('');
      setAboutError('');
      setUrlError('');
    },
    [setValues, setIsValid],
  );

  return {
    values,
    setValues,
    nameError,
    aboutError,
    emailError,
    passwordError,
    urlError,
    setUrlError,
    isValid,
    setIsValid,
    handleChange,
    resetForm,
  };
};
