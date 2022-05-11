import React from 'react';
import { Layout, message } from 'antd';

import { PageContent } from 'app/components/layout';
import {
  RegistrationValue,
  UserDetailsErrors,
  UserRegistrationField,
} from 'app/page/registration/user-registration-field';
import { userService } from 'app/api/service/user-service';
import { navigationService } from 'app/service/navigation-service';

import styles from 'app/page/login/login-page.module.scss';
import { BdarPage } from 'app/page/BDAR/bdar-page';

const { Content } = Layout;

interface State {
  BDARpage: boolean;
  registrationFieldValues: RegistrationValue;
}

class RegistrationPage extends React.Component<State> {

  public state: State = {
    BDARpage: false,
    registrationFieldValues: {
      id: 0,
      fullName: '',
      email: '',
      password: '',
      organization: '',
      phoneNo: '',
      BDAR: false,
    },
  };

  public readonly toogleBDARpage = () => {
    this.setState({ BDARpage: !this.state.BDARpage });
  };

  private readonly validate = (values: RegistrationValue): UserDetailsErrors => {
    const errors: UserDetailsErrors = { };
    this.setState({ registrationFieldValues: values })

    if (!values.fullName) {
      errors.fullName = 'Įveskite vardą ir pavardę';
    }

    const emailSymbols = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailSymbols.test(values.email)) {
      errors.email = 'Netinkamas el.pašto formatas';
    }
    if (!values.email) {
      errors.email = 'Įveskite el.pašto adresą';
    }

    const pswrd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?.])[A-Za-z\d#$@!%&*?.]{8,20}$/;

    if (!pswrd.test(values.password)) {
      errors.password = 'Turi būti bent 8 simboliai, didžioji raidė, skaičius ir specialusis simbolis';
    }

    if (!values.password) {
      errors.password = 'Įveskite slaptažodį';
    }

    const phoneNumberRegex = /(^(\+370)[0-9]{8}$)|(^[0-9]{9})$/g;

    if (!phoneNumberRegex.test(values.phoneNo)) {
      errors.phoneNo = 'Netinkamas telefono numerio formatas';
    }

    if (!values.phoneNo) {
      errors.phoneNo = 'Įveskite telefono numerį';
    }

    if (!values.BDAR) {
      errors.BDAR = 'Pažymėkite, kad sutinkate su sąlygomis';
    }

    return errors;
  };

  private static readonly REGISTER_VALUES: RegistrationValue = {
    id: 0,
    fullName: '',
    email: '',
    password: '',
    organization: '',
    phoneNo: '',
    BDAR: false,
  };

  private readonly handleClickLogin = (): void => { navigationService.redirectToLoginPage(); };
  public render(): React.ReactNode {

    return (
      <Layout>
        <Content>
          <PageContent className={this.state.BDARpage ? styles.f : styles.content}>
            { !this.state.BDARpage && (
              <>
                <div className={styles.topRow}>
                  <div onClick={navigationService.redirectToDefaultPage} className={styles.logo} />
                  <div className={styles.prisijungimoregistracijos}>
                    <h3 onClick={this.handleClickLogin}>Prisijungti</h3>
                    <h3 className={styles.activeFormType} >Registruotis</h3>
                  </div>
                </div>
                <h2 className={styles.welcome}>Sveiki!</h2>
                <section className={styles.registrationFormContainer}>
                  <UserRegistrationField
                    onSubmit={this.handleSubmit}
                    onCancel={() => {}}
                    validate={this.validate}
                    initialValues={this.state.registrationFieldValues}
                    toogleBDARpage={this.toogleBDARpage}
                  />
                </section>
              </>
            )}
            { this.state.BDARpage && (
              <BdarPage
                toogleBDARpage={this.toogleBDARpage}
              />
            )}
          </PageContent>
        </Content>
      </Layout>
    );
  }

  private readonly handleSubmit = (values: RegistrationValue): void => {
    userService.createUser({
      id: 0,
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      phoneNo: values.phoneNo,
    })
      .then(() => { message.success('Registracija sėkminga!', 1, navigationService.redirectToLoginPage); })
      .catch (error => {
        message.error('Nesėkminga registracija, patikrinkite įvestus duomenis', 1)
          .then(() => window.location.reload());
      });
  };
}

export { RegistrationPage };
