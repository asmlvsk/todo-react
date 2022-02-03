import * as Yup from 'yup';

const userSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
    .min(2, 'Email must be at least 2 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(2, 'Password must be at least 2 characters'),
});

export default userSchema;
