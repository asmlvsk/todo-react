import * as Yup from 'yup';

const taskSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters'),
});

export default taskSchema;
