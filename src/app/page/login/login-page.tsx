import React from 'react';
import { Layout, message } from 'antd';
import { FormikHelpers } from 'formik';
// tslint:disable-next-line:no-submodule-imports
import { FormikState } from 'formik/dist/types';
import { RouteComponentProps } from 'react-router';
import { PageContent } from 'app/components/layout';
import { connectContext, Session as ContextSession, SettingsProps } from 'app/context';
import { navigationService } from 'app/service/navigation-service';
import { sessionService } from 'app/api/service/session-service';
import { loggerService } from 'app/service/logger-service';
import { LoginErrors, LoginForm, LoginValues } from './form/login-form';

import styles from './login-page.module.scss';

const { Content } = Layout;

interface ContextProps {
  authenticated: boolean;
  updateSession: (session: ContextSession) => void;
  lastPrivatePage: string;

}

interface OwnProps {
}

interface LocationState {
  previousPath: string;
}
type Props = OwnProps & ContextProps & RouteComponentProps<{}, any, LocationState>;

class LoginPageComponent extends React.Component<Props, {}> {

  private static readonly LOGIN_INITIAL_VALUES: LoginValues = { email: '', password: '' };

  private static readonly validate = (values: LoginValues): LoginErrors => {
    const errors: LoginErrors = {};

    if (!values.email) {
      errors.email = 'Neįvestas el. pašto adresas';
    }
    if (!values.password) {
      errors.password = 'Neįvestas slaptažodis';
    }

    return errors;
  };

  public componentDidMount(): void {
    const {
      authenticated,
    } = this.props;

    if (authenticated) {
      navigationService.redirectToDefaultPage();
    }
  }
  private readonly handleClickRegister = (): void => { navigationService.redirectToRegistrationPage(); };

  public render(): React.ReactNode {

    return (
      <Layout>
        <Content>
          <PageContent className={styles.content}>
            <div className={styles.topRow}>
              <div onClick={navigationService.redirectToDefaultPage} className={styles.logo} />
              <div className={styles.prisijungimoregistracijos}>
                <h3 className={styles.activeFormType} >Prisijungti</h3>
                <h3 onClick={this.handleClickRegister}>Registruotis</h3>
              </div>
            </div>
              <h2 className={styles.welcome}>Sveiki sugrįžę!</h2>
              <section className={styles.loginFormContainer}>
                <LoginForm
                  initialValues={LoginPageComponent.LOGIN_INITIAL_VALUES}
                  onSubmit={this.handleSubmit}
                  validate={LoginPageComponent.validate}
                />
              </section>
          </PageContent>
        </Content>
      </Layout>
    );
  }

  private readonly handleSubmit = (values: LoginValues, { resetForm }: FormikHelpers<LoginValues>): void => {
    const {
      updateSession,
    } = this.props;

    sessionService.login(values.email, values.password)
      .then(session => {
        console.log(`Last: ${this.props.lastPrivatePage}`);
        updateSession({ user: session.user, authenticated: !!session.user });

        navigationService.goToPath(this.props.lastPrivatePage);
      })
      .catch(error => this.handleError(error, resetForm));
  };

  private readonly handleError = (
    error: any,
    resetForm: (nextValues?: Partial<FormikState<LoginValues>>) => void,
  ): void => {
    resetForm({ values: LoginPageComponent.LOGIN_INITIAL_VALUES });

    const errorMessage: string = error.status === 403
      ? 'Patikrinkite prisijungimo duomenis'
      : error.data.message;

    message.error(errorMessage);

    loggerService.error(errorMessage, error);
  };

}

const mapContextToProps = (
  { session: { authenticated }, lastPrivatePage, actions: { updateSession } }: SettingsProps,
): ContextProps => ({
  authenticated,
  updateSession,
  lastPrivatePage,
});

const LoginPage = connectContext(mapContextToProps)(LoginPageComponent);

export { LoginPage };
