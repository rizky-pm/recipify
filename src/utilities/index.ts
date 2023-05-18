import { RuleObject, FormInstance } from 'antd/lib/form';

import { PASSWORD_REGEX } from '../constants';

export const handleValidatePassword = (
  form: FormInstance,
  _: RuleObject,
  value: string,
  fieldTarget: 'password' | 'confirmPassword'
): Promise<void> => {
  const isPasswordValid = PASSWORD_REGEX.test(value);
  const fieldTargetValue = form.getFieldValue(fieldTarget);

  if (!isPasswordValid && value !== undefined && value !== '') {
    return Promise.reject(
      new Error('Password must contain at least 8 characters and 1 digit.')
    );
  } else {
    if (value !== '') {
      form.setFields([{ name: fieldTarget, errors: [] }]);
    }

    if (fieldTargetValue !== value && value !== '' && value !== undefined) {
      return Promise.reject(new Error('Password not match.'));
    }
  }

  form.setFields([{ name: fieldTarget, errors: [] }]);

  return Promise.resolve();
};
