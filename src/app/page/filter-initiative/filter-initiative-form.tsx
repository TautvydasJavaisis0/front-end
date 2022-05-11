import React from 'react';
import { message, Select } from 'antd';
// tslint:disable-next-line:import-group-ordering
import moment from 'moment';
import { Field, Form, Formik, FormikConfig } from 'formik';

import { RangePickerField, SelectField } from 'app/components/inputs';
import { FormButton, SubmitButton } from 'app/components/buttons';
import { districtsService } from 'app/api/service/districts-service';

import styles from './filter-initiative-page.module.scss';

const { Option } = Select;

export interface FilterValue {
  location: string | undefined;
  _datePlaceholder: string;
  startDate: any;
  endDate: any;
  features: string[];
}

interface OwnProps {
  features: string[];
  onReset: () => void;
}

interface State {
  features: string[];
  districtList: Api.DistrictsDto[];
}

type Props = OwnProps & FormikConfig<FilterValue>;

class FilterInitiativeForm extends React.Component<Props, State> {

  public state: State = {
    features: this.props.features,
    districtList: [],
  };

  public toggleButton = (featureName: string, setFieldValue: any) => {
    if (this.state.features.length >= 3) {
      this.setState({ features: this.state.features.filter(_feature => _feature !== featureName) });
      // Trying to pick more than 3
      if (!this.state.features.some(_feature => _feature === featureName)) {
        message.error('Negalima pasirinkti daugiau nei 3 savybių!');
      // Trying to undo when there are already 3 picked
      } else {
        // Getting all selected features except clicked one
        const features = this.state.features.filter(_feature => _feature !== featureName);

        setFieldValue('features', features);
      }
    // We have less than 3 selected
    } else {
      // Trying to undo when there are less than 3 selected
      if (this.state.features.some(_feature => _feature === featureName)) {
        const features = this.state.features.filter(_feature => _feature !== featureName);

        this.setState({ features });
        setFieldValue('features', features);
      // Adding additional one
      } else {
        const features = [...this.state.features, featureName];

        this.setState({ features });
        setFieldValue('features', features);
      }
    }

  };

  public renderButton = (feature: string, setFieldValue: any) =>
    (
      <div
        className={this.state.features.some(_feature => _feature === feature) ? styles.buttonOn : styles.buttonOff}
        onClick={() => this.toggleButton(feature, setFieldValue)}
      >
        <div className={styles.buttonText}>
          {feature.replace(/^\w/, (c) => c.toUpperCase())}
        </div>
      </div>
    );

  public componentDidMount() {
    districtsService.getDistricts()
      .then((response) => {
        this.setState({ districtList: response });
      });
  }

  public render(): React.ReactNode {
    const {
      initialValues,
      onSubmit,
      onReset,
    } = this.props;

    const {
      districtList,
    } = this.state;

    return (
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validateOnChange={true}
          onReset={onReset}
        >
          {({ setFieldValue }) => (
            <Form className={styles.forms}>
              <div className={styles.buttonSection}>
                <div className={styles.inputLength}>
                  <Field
                    component={SelectField}
                    showSearch={true}
                    label={<span className={styles.labels}>Vieta</span>}
                    name="location"
                    // Need to have value undefined to have a placeholder
                    // https://github.com/ant-design/ant-design/issues/5768#issuecomment-361892404
                    value={undefined}
                    placeholder="Pasirinkite savanorystės vietą..."
                    onChange={(option: string) => setFieldValue('location', option)}
                  >
                    { districtList.map(location =>
                      <Option key={location.id} value={location.name ?? ''}>{`${location.name} [${location.count}]`}</Option>)
                    }
                  </Field>
                </div>
                <div className={styles.inputLength}>
                  <Field
                    label={<span className={styles.labels}>Laikotarpis</span>}
                    component={RangePickerField}
                    name="_datePlaceholder"
                    placeholder={['Pradžia', 'Pabaiga']}
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    // To change 'OK' text: https://stackoverflow.com/a/66936409
                    onChange={(e: [moment.Moment, moment.Moment]) => {
                      // Only setting the values if 'e' is not null
                      setFieldValue('_datePlaceholder', (e || []).length === 2 ? e : null);
                      setFieldValue('startDate', (e || []).length === 2 ? e[0] : null);
                      setFieldValue('endDate', (e || []).length === 2 ? e[1] : null);
                    }}
                    // https://github.com/ant-design/ant-design/issues/5146#issuecomment-464690761
                    disabledDate={(d: any) => !d || d.isBefore(Date.now())} />
                </div>
                <div className={styles.featuresLabel}>
                  Kokias savybes norite įgyti
                </div>
                <div className={styles.buttonBox} >
                  <div className={styles.featureList}>
                    {this.renderButton('pilietiškumas', setFieldValue)}
                    {this.renderButton('lyderystė', setFieldValue)}
                    {this.renderButton('komunikacija', setFieldValue)}
                  </div>
                  <div className={styles.featureList}>
                    {this.renderButton('tolerancija', setFieldValue)}
                    {this.renderButton('solidarumas', setFieldValue)}
                    {this.renderButton('kūrybiškumas', setFieldValue)}
                  </div>

                </div>
              </div>
              <footer className={styles.bottomButton}>
                <FormButton
                  component={SubmitButton}
                >
                  Filtruoti
                </FormButton>
              </footer>
            </Form>
          )}
        </Formik>

      </div>
    );

  }

}

export { FilterInitiativeForm };
