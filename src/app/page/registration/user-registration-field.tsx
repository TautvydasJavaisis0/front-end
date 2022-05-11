import React from 'react';
import { Field, Form, Formik, FormikConfig } from 'formik';

import { FormButton, SubmitButton } from 'app/components/buttons';
import { InputField, PasswordInputField, CheckboxField } from 'app/components/inputs';
import { FormErrors } from 'app/model/form-errors';

import styles from 'app/page/login/login-page.module.scss';

export interface RegistrationValue {
  id: 0;
  organization: string;
  fullName: string;
  email: string;
  password: string;
  phoneNo: string;
  BDAR: boolean;
}
// const { Option } = Select;

interface OwnProps {
  onCancel: () => void;
  toogleBDARpage: () => void;
}

export type UserDetailsErrors = FormErrors<RegistrationValue>;

type Props = OwnProps & FormikConfig<RegistrationValue>;

class UserRegistrationField extends React.Component<Props> {
  public value: any;

  private readonly handleClick = () => {
    this.props.toogleBDARpage();
  };

  public render(): React.ReactNode {
    const {
      initialValues,
      onSubmit,
      validate,
    } = this.props;

    return (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validate}
          enableReinitialize={true}
        >
          {({ setFieldValue }) => (
            <Form>
                <section>
                  <div className={styles.formFieldShadow}>
                    <Field
                      className={styles.formFieldInput}
                      component={InputField}
                      label={<span style={{ color: '#fb984c' }}>Vardas, pavardė</span>}
                      name="fullName"
                      placeholder="Vardenis Pavardenis"
                      validate={this.value !== ''}
                    />
                  </div>
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
                      component={InputField}
                      label={<span style={{ color: '#fb984c' }}>Telefono numeris</span>}
                      name="phoneNo"
                      placeholder="+370..."
                      validate={this.value !== ''}
                    />
                  </div>
                  <div className={styles.formFieldShadow}>
                    <Field
                      className={styles.formFieldInput}
                      component={PasswordInputField}
                      label={<span style={{ color: '#fb984c' }}>Slaptažodis</span>}
                      name="password"
                      placeholder="Įveskite slaptažodį"
                      // iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                  </div>
                  <Field
                    className={styles.checkboxLabel}
                    onChange={(e: any) => setFieldValue('BDAR', e.target.checked)}
                    component={CheckboxField}
                    name="BDAR"
                  >
                    <div style={{ fontSize: 12 }}>
                      Sutinku su <u onClick={this.handleClick}>taisyklėmis ir privatumo politika </u>
                    </div>
                  </Field>
                  <div className={styles.formButton}>
                    <FormButton
                      component={SubmitButton}
                    >
                      Registruotis
                    </FormButton>
                  </div>

                </section>
            </Form>
          )}
        </Formik>
    );
  }

}

export { UserRegistrationField };
