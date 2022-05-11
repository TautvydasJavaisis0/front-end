import React from 'react';
import { Field, Form, Formik, FormikConfig } from 'formik';

import { InputField, PasswordInputField } from 'app/components/inputs';
import { FormButton, SubmitButton } from 'app/components/buttons';
import { FormErrors } from 'app/model/form-errors';

import styles from "app/page/login/login-page.module.scss";

export interface LoginValues {
  email: string;
  password: string;
}

export type LoginErrors = FormErrors<LoginValues>;

type Props = FormikConfig<LoginValues>;

const LoginForm: React.FC<Props> = (props: Props) => {
  const {
    initialValues,
    onSubmit,
    validate,
  } = props;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      {() => (
        <Form>
          <div className={styles.formFieldShadow}>
           <Field
             className={styles.formFieldInput}
             component={InputField}
             label={<span style={{ color: '#fb984c' }}>El. paštas</span>}
             name="email"
             placeholder="pavyzdys@gmail.com"
           />
          </div>
          <div className={styles.formFieldShadow}>
            <Field
              className={styles.formFieldInput}
              component={PasswordInputField}
              label={<span style={{ color: '#fb984c' }}>Slaptažodis</span>}
              name="password"
              placeholder="****************"
            />
          </div>
          <div className={styles.formButton}>
          <FormButton
            component={SubmitButton}
          >
            Prisijungti
          </FormButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { LoginForm };
