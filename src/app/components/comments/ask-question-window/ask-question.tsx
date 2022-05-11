import * as React from 'react';
import { Field, Form, Formik } from 'formik';
import { message } from 'antd';

import { ArrowButton } from 'app/components/buttons/arrow-button/arrow-button';
import { TextAreaField } from 'app/components/inputs';
import { FormButton, SubmitButton } from 'app/components/buttons';
import { commentsService } from 'app/api/service/comments-service';

import styles from './ask-question.module.scss';

interface QuestionFormDto {
  question: string;
}

interface OwnProps {
  initiativeID: number;
  initiativeTitle?: string;
  toggleAskQuestionWindow: () => void;
}

type Props = OwnProps;

const AskQuestionWindow: React.FC<Props> = ({ initiativeID, initiativeTitle, toggleAskQuestionWindow }) => {

  const INITIAL_VALUES: QuestionFormDto = { question: '' };

  const validate = (values: QuestionFormDto) => {
    if (!values.question) {
      return { question: 'Prašome nepalikti tuščio lauko' };
    } else if (values.question.length < 10) {
      return { question: 'Užduokite ilgesnį klausimą nei 10 simbolių' };
    }
  };

  const handleSubmit = (values: QuestionFormDto) => {
    commentsService.postQuestion({
      text: values.question,
      initiativeID,
    })
      .then(handleContinue)
      .catch(() => {
        message.error('Įvyko klaida kuriant jūsų klausimą. Bandykite dar kartą', 1)
          .then(() => window.location.reload());
      });
  };

  const handleContinue = () => {
    message.success('Jūsų klausimas sukurtas!');
    toggleAskQuestionWindow();
  };

  return (
    <div>
      <div className={styles.headerContainer}>
        <ArrowButton pointingLeft={true} className={styles.arrowButton} onClick={toggleAskQuestionWindow} />
        <div>
          <h3>Užduok klausimą</h3>
          <span>{initiativeTitle}</span>
        </div>
      </div>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        validate={validate}
      >
        {() => (
          <Form className={styles.field}>
            <Field
              component={TextAreaField}
              label="Įveskite klausimą"
              name="question"
              placeholder="Pavyzdžiui, „Sveiki, ar savanorystės iniciatyvoje bus nemokamas maitinimas?“"
              maxLength={300}
              showCount={true}
            />
            <div className={styles.submitButtonContainer}>
              <FormButton
                component={SubmitButton}
              >
                Pateikti
              </FormButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { AskQuestionWindow };
