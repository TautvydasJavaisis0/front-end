import React from 'react';
import { Layout, message } from 'antd';
// tslint:disable-next-line:no-submodule-imports
import SwiperCore from 'swiper/core';

import { PageContent } from 'app/components/layout';
import { WhiteBoxContent } from 'app/components/layout/white-box-content/white-box-content';
import { initiativeService } from 'app/api/service/initiative-service';
import { navigationService } from 'app/service/navigation-service';
import { CreateInitiativeForm } from 'app/page/create-initiative/form/create-initiative-form';
import { FormErrors } from 'app/model/form-errors';
import InitiativeLogo from 'app/resources/icons/iniciatyva.svg';
import { connectContext, SettingsProps } from 'app/context';

import styles from './create-initiative.module.scss';

const { Content } = Layout;

export interface InitiativeFormDto {
  title: string;
  description: string;
  location: string;
  organization?: string;
  address: string;
  totalNumberOfVolunteers: number;
  // Basically, need to set the 'name' tag for <Field> and then setFieldValue for the with the same name
  // to show an error message. If using without _date, then either there won't be an error message after
  // invalid date range or after confirming date, the values disappear from input field. Ugly hacky workaround :)
  _datePlaceholder?: string;
  startDate: any;
  endDate: any;
  features: [];
  // Another hacky way to check in validation function if dropdown is open or not. React is fun!
  _featuresClosed: boolean;
}
export type InitiativeFormErrors = FormErrors<InitiativeFormDto>;

interface State {
  isFormSubmitted?: boolean;
  redirectId: number;
  swiper: any;
}

interface ContextProps {
  userId?: number;
}

type Props = ContextProps;

class CreateInitiative extends React.Component<Props, State> {

  public readonly state: State = {
    isFormSubmitted: false,
    redirectId: 0,
    swiper: null,
  };

  // Initially form data is empty
  private static readonly EMPTY_FORM: InitiativeFormDto = {
    _datePlaceholder: '',
    title: '',
    description: '',
    organization: '',
    location: '',
    address: '',
    startDate: '',
    endDate: '',
    features: [],
    totalNumberOfVolunteers: 1,
    _featuresClosed: true,
  };

  private readonly setSwiper = (swiper: SwiperCore): void => {
    this.setState({ swiper });
  };

  public render(): React.ReactNode {
    const {
      isFormSubmitted,
    } = this.state;

    return (
      <Layout>
        <Content>
          <PageContent className={styles.pageContent}>
            <img className={styles.logo} src={InitiativeLogo} alt={'Initiative logo'} />
            <WhiteBoxContent className={styles.whiteBox}>
              <CreateInitiativeForm
                initialValues={CreateInitiative.EMPTY_FORM}
                validate={this.validate}
                onCancel={CreateInitiative.handleCancel}
                onSubmit={this.handleSubmit}
                onContinue={this.handleContinue}
                isFormSubmitted={isFormSubmitted}
                setSwiper={this.setSwiper}
              />
            </WhiteBoxContent>
          </PageContent>
        </Content>
      </Layout>
    );
  }

  private readonly validate = (values: InitiativeFormDto): InitiativeFormErrors => {
    const errors: InitiativeFormErrors = { };

    if (!values.title) {
      errors.title = 'Iniciatyvos pavadinimas yra privalomas';
    }
    if (!values.description) {
      errors.description = 'Iniciatyvos aprašymas yra privalomas';
    }
    if (!values.location) {
      errors.location = 'Iniciatyvos vieta yra privaloma';
    }
    if (!values.address) {
      errors.address = 'Iniciatyvos adresas yra privalomas';
    }
    if (!values.totalNumberOfVolunteers) {
      errors.totalNumberOfVolunteers = 'Pasirinkite reikiamą savanorių skaičių';
    } else if (values.totalNumberOfVolunteers > 100 || values.totalNumberOfVolunteers < 1) {
      errors.totalNumberOfVolunteers = 'Pasirinkite savanorių skaičių nuo 1 iki 100';
    }
    if (!values.startDate || !values.endDate) {
      errors._datePlaceholder = 'Iniciatyvos data yra privaloma';
    } else if (values.endDate.diff(values.startDate, 'minutes') < 10) {
      errors._datePlaceholder = 'Iniciatyva turi trukti ilgiau';
    }
    if ((values.features || []).length < 1) {
      errors.features = 'Pasirinkite bent vieną iniciatyvos ugdomą savybę';
    }

    // If user completes second page but not the first one and closes the dropdown for feature list
    if ((!values.title || !values.description || !values.location) &&
        (values.totalNumberOfVolunteers && values.startDate && values.endDate &&
        (values.features || []).length > 0 && !values._featuresClosed) &&
        this.state.swiper?.realIndex === 1) {
      this.state.swiper?.slideTo(0);
      message.warning('Pabaikite pildyti formą');
    }

    return errors;
  };

  private readonly filtrateCoordinates = (data: any, city: string): [number, number] => {
    try {
      // Trying to filter coordinates by city's first 3 letters to get the same city
      for (const location of data) {
        if (location.locality.toLowerCase().substring(0, 3) === city.toLowerCase().substring(0, 3)) {
          return [location.latitude, location.longitude];
        }
      }
      return [data[0].latitude, data[0].longitude];
    } catch (e) {
      // If filtering failed, then returning Gedimino pr. 1, Vilnius
      return [54.861956, 24.469354];
    }
  };

  private readonly handleSubmit = (values: InitiativeFormDto): void => {
    fetch(`http://api.positionstack.com/v1/forward?access_key=4d1cd247d19d80b916bcb000526da560&query=${values.location},${values.address}`)
      .then(response => response.json())
      .then((body) => {
        const [locationLat, locationLng] = this.filtrateCoordinates(body.data, values.location);

        // TODO: Change initiative sender id from 1
        // TODO: Add organization
        initiativeService.createInitiative({
          userID: this.props.userId ?? 1,
          title: values.title,
          description: values.description,
          location: values.location,
          address: values.address,
          latitude: locationLat,
          longitude: locationLng,
          totalNumberOfVolunteers: values.totalNumberOfVolunteers,
          currentNumberOfVolunteers: 0,
          startDate: values.startDate.toISOString(),
          endDate: values.endDate.toISOString(),
          features: values.features.map((feature: string) => feature.toLowerCase()),
        })
          .then((response) => {
            // this.setState({ isFormSubmitted: true });
            this.setState({ redirectId: response.id ?? 1 });
            message.success('Iniciatyva sukurta sėkmingai!', 1)
              .then(this.handleContinue);
          })
          .catch(() => {
            message.error('Įvyko klaida kuriant jūsų iniciatyvą. Bandykite dar kartą')
              .then(() => window.location.reload());
          });
      });
  };

  private static readonly handleCancel = (): void => {
    navigationService.redirectToDefaultPage();
  };

  private readonly handleContinue = () => {
    navigationService.redirectToInitiativeDetailsPage(this.state.redirectId);
  };
}

const mapContextToProps = ({ session: { user } }: SettingsProps): ContextProps => ({
  userId: user?.id,
});

const CreateInitiativePage = connectContext(mapContextToProps)(CreateInitiative);

export { CreateInitiativePage };
