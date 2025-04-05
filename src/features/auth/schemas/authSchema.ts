import * as Yup from 'yup';

import { AuthValues } from '../types';

const AuthValidationSchema: Yup.ObjectSchema<AuthValues> = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default AuthValidationSchema;
