import React from 'react';
import { Button, message, Select } from 'antd';
import { Field, Form, Formik, FormikConfig } from 'formik';
import _ from 'lodash';
// tslint:disable-next-line:import-group-ordering
import moment from 'moment';
// tslint:disable-next-line:no-submodule-imports
import 'swiper/swiper.scss';
// tslint:disable-next-line:no-submodule-imports
import 'swiper/components/pagination/pagination.scss';
// tslint:disable-next-line:no-submodule-imports
import 'swiper/components/navigation/navigation.scss';
// tslint:disable-next-line:no-submodule-imports
import { Swiper, SwiperSlide } from 'swiper/react';
// tslint:disable-next-line:no-submodule-imports
import SwiperCore, { A11y, Pagination, Navigation } from 'swiper/core';

import { FormButton, SubmitButton } from 'app/components/buttons';
import { InputField, InputNumberField, RangePickerField, SelectField, TextAreaField } from 'app/components/inputs';
import { InitiativeFormDto } from 'app/page/create-initiative/create-initiative-page';

import locations from 'app/resources/json/location-list.json';
import initiativeQualities from 'app/resources/json/features-list.json';

import styles from './create-initiative-form.module.scss';
// import Swiper core and required modules
SwiperCore.use([Pagination, A11y, Navigation]);

const { Option } = Select;

interface OwnProps {
  onCancel: () => void;
  onContinue: () => void;
  isFormSubmitted: boolean | undefined;
  setSwiper: (swiper: SwiperCore) => void;
}

type Props = OwnProps & FormikConfig<InitiativeFormDto>;

class CreateInitiativeForm extends React.Component<Props> {

  public render(): React.ReactNode {
    const {
      initialValues,
      onSubmit,
      validate,
      onCancel,
      onContinue,
      isFormSubmitted,
      setSwiper,
    } = this.props;

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
        validateOnChange={true}
        validateOnMount={true}
      >
        {({ setFieldValue }) => (
          <>
            <div className={styles.formHeaderContainer}>
              <h2 className={styles.initiativeHeader}>Iniciatyvos kūrimas</h2>
              <Button
                className={styles.formButtonClose}
                type={'text'}
                onClick={onCancel}
              >
                &#10006;
              </Button>
            </div>
            <Form>
              <div className={styles.swiperContainer}>
                <Swiper
                  style={{ paddingLeft: 10, paddingRight: 10 }}
                  spaceBetween={40}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  navigation={true}
                  onSwiper={setSwiper}
                >
                  <SwiperSlide
                    className={styles.swiperSlide}
                  >
                    <Field
                      component={InputField}
                      className={styles.formItem}
                      label="Pavadinimas"
                      name="title"
                      maxLength={50}
                      placeholder="Įveskite iniciatyvos pavadinimą"
                    />
                    <Field
                      className={styles.textarea}
                      component={TextAreaField}
                      label="Aprašymas"
                      name="description"
                      placeholder="Įveskite iniciatyvos aprašymą..."
                      maxLength={500}
                      showCount={true}
                    />
                    <Field
                      component={InputField}
                      // style={{ marginTop: -10 }}
                      label="Organizacijos pavadinimas"
                      name="organization"
                      placeholder="Įveskite organizacijos pavadinimą"
                    />
                    <Field
                      component={SelectField}
                      showSearch={true}
                      label="Savivaldybė"
                      name="location"
                      // Need to have value undefined to have a placeholder
                      // https://github.com/ant-design/ant-design/issues/5768#issuecomment-361892404
                      value={undefined}
                      placeholder="Pasirinkite savivaldybę..."
                      onChange={(option: string) => setFieldValue('location', option)}
                    >
                      { locations.map(location =>
                        <Option key={location} value={location}>{location}</Option>)
                      }
                    </Field>
                  </SwiperSlide>
                  <SwiperSlide
                    className={styles.swiperSlide}
                  >
                    <Field
                      component={InputField}
                      // style={{ marginTop: -10 }}
                      label="Adresas"
                      name="address"
                      placeholder="Įveskite adresą..."
                    />
                    <Field
                      className={styles.formItem}
                      style={{ paddingTop: 2, paddingBottom: 2 }}
                      component={InputNumberField}
                      label="Reikiamas savanorių skaičius"
                      name="totalNumberOfVolunteers"
                      onChange={(value: string) => setFieldValue('totalNumberOfVolunteers', _.parseInt(value))}
                    />

                    <Field
                      className={styles.formItem}
                      component={RangePickerField}
                      label="Laikotarpis"
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
                      disabledDate={(d: any) => !d || d.isBefore(Date.now())}
                    />

                    {/* FIXME: Dropdown doesn't open on click on pc. Only works for mobile
                          Possible issue: https://github.com/ant-design/ant-design/issues/27018 */}
                    <Field
                      component={SelectField}
                      className={styles.selector}
                      // showSearch={false}
                      showArrow={true}
                      label="Ugdomos savybės"
                      name="features"
                      mode="multiple"
                      // value={undefined}
                      defaultValue={undefined}
                      placeholder="Pasirinkite norimas savybes..."
                      onChange={(options: []) => {
                        setFieldValue('_featuresClosed', true);
                        // Allowing only 3 qualities to select
                        if (options?.length < 4) {
                          setFieldValue('features', options);
                        } else {
                          message.warning('Pasirinkite iki 3 savybių');
                        }
                      }}
                      // Blur happens when dropdown closes (for some reason on desktop in happens onClick)
                      onBlur={() => setFieldValue('_featuresClosed', false)}
                    >
                      { initiativeQualities.map(quality =>
                        <Option key={quality} value={quality}>{quality}</Option>)
                      }
                    </Field>
                    <div className={styles.formButtonSubmitContainer}>
                      <FormButton
                        component={SubmitButton}
                      >
                        Sukurti
                      </FormButton>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
              { isFormSubmitted && (
                <Button
                  className={styles.formButtonContinue}
                  onClick={onContinue}
                >
                  Tęsti
                </Button>
              )}
            </Form>
          </>
        )}
      </Formik>
    );
  }
}
export { CreateInitiativeForm };
