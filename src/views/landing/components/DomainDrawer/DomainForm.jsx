import { Field, Form, Formik } from 'formik';

import * as Yup from 'yup';
import { forwardRef } from 'react';
import { Select, Input, FormItem } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import {
  useAddDomainMutation,
  useUpdateDomainMutation,
} from 'services/domainApi.js';
import { closeDomainModal } from '../../../../store/slices/domainSlice.js';

const statusOptions = [
  {
    value: false,
    label: 'Inactive',
  },
  {
    value: true,
    label: 'Active',
  },
];
const verificationOptions = [
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'verified',
    label: 'Verified',
  },
  {
    value: 'rejected',
    label: 'Rejected',
  },
];

const validationSchema = Yup.object().shape({
  domain: Yup.string()
    .matches(
      /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/,
      'Domain name must be in a valid format'
    )
    .required('Domain name is required'),

  status: Yup.string()
    .oneOf(['pending', 'verified', 'rejected'], 'Invalid status value')
    .required('Status is required'),

  isActive: Yup.boolean().required('Activity status is required'),
});

const DomainForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const selectedDomain = useSelector(
    (state) => state.domainUi.selectedDomainData
  );
  const editingDomainId = useSelector(
    (state) => state.domainUi.editingDomainId
  );

  const [addDomain] = useAddDomainMutation();
  const [updateDomain] = useUpdateDomainMutation();

  console.log('selectedDomain', selectedDomain);

  const onFormSubmit = async (values) => {
    console.log('Form submitted with values:', values);
    try {
      if (editingDomainId && selectedDomain) {
        console.log('Attempting to update domain ID:', editingDomainId);

        const updatePayload = {
          domain: values.domain,
          isActive: values.isActive,
          status: values.status, // Include status if it's updatable
        };
        await updateDomain({
          id: editingDomainId,
          payload: updatePayload,
        }).unwrap();
      } else {
        console.log('Attempting to add new domain.');
        const addPayload = {
          domain: values.domain,
          status: values.status,
          isActive: values.isActive,
          createdDate: Date.now(),
        };
        await addDomain(addPayload).unwrap();
      }
      dispatch(closeDomainModal());
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <Formik
      innerRef={ref}
      initialValues={{
        domain: '' || selectedDomain?.domain,
        status: selectedDomain?.status || 'pending',
        isActive: selectedDomain?.isActive || false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onFormSubmit?.(values);
        setSubmitting(false);
      }}
    >
      {({ touched, errors, values }) => (
        <Form className='p-1'>
          <FormItem
            label='Domain'
            invalid={errors.domain && touched.domain}
            errorMessage={errors.domain}
          >
            <Field
              type='text'
              autoComplete='off'
              name='domain'
              placeholder='Enter your domain'
              component={Input}
            />
          </FormItem>
          <FormItem
            label='Status'
            invalid={errors.status && touched.status}
            errorMessage={errors.status}
          >
            <Field name='isActive'>
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  options={statusOptions}
                  value={statusOptions.filter(
                    (option) => option.value === values.isActive
                  )}
                  onChange={(option) =>
                    form.setFieldValue(field.name, option?.value)
                  }
                />
              )}
            </Field>
          </FormItem>
          <FormItem
            label='Verification'
            invalid={errors.status && touched.status}
            errorMessage={errors.status}
          >
            <Field name='status'>
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  options={verificationOptions}
                  value={verificationOptions.filter(
                    (option) => option.value === values.status
                  )}
                  onChange={(option) =>
                    form.setFieldValue(field.name, option?.value)
                  }
                />
              )}
            </Field>
          </FormItem>
        </Form>
      )}
    </Formik>
  );
});

export default DomainForm;
