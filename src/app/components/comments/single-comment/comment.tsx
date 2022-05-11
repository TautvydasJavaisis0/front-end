import React, { useEffect, useRef, useState } from 'react';
import Truncate from 'react-truncate';
import { message } from 'antd';

import QuestionIcon from 'app/resources/icons/question-icon.svg';
import ArrowIcon from 'app/resources/icons/answer-arrow.svg';
import TrashIcon from 'app/resources/icons/trash.svg';
import { TextArea, TextAreaRef } from 'app/components/inputs';
import SendIcon from 'app/resources/icons/send-answer-icon.svg';
import { commentsService } from 'app/api/service/comments-service';

import styles from './comment.module.scss';

interface Props {
  canAnswer: boolean;
  initiativeId: number;
  questionId?: number;
  question?: string;
  answer?: string;
}

const Comment: React.FC<Props> = ({ canAnswer, initiativeId, questionId, question, answer }) => {
  const [expanded, setExpand] = useState(false);
  const [truncated, setTruncate] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const areaFieldRef = useRef<TextAreaRef>(null);

  const handleAnswerSubmit = () => {
    if (areaFieldRef.current?.resizableTextArea &&
        areaFieldRef.current.resizableTextArea.textArea.value.length > 0 && questionId) {
      commentsService.postAnswer({
        text: areaFieldRef.current.resizableTextArea.textArea.value,
        initiativeID: initiativeId,
        linkedCommentID: questionId,
      })
        .then(() => message.success('Jūsų atsakymas sukurtas!', 1))
        .then(() => window.location.reload())
        .catch(() => {
          message.error('Įvyko klaida bandant atsakyti į klausimą');
        });
    }
  };

  const handleQuestionDelete = () => {
    if (questionId) {
      commentsService.deleteQuestion(questionId)
        .then(() => {
          message.success('Klausimas sėkmingai ištrintas', 1);
          setIsDeleted(true);
        })
        .then(() => window.location.reload())
        .catch(() => {
          message.error('Nepavyko ištrinti klausimo');
        });
    }
  };
  // Truncate function
  const handleTruncate = (isTruncated: boolean) => {
    if (truncated !== isTruncated) {
      setTruncate(isTruncated);
    }
  };
  // Truncation function
  const toggleLines = (event: any) => {
    event.preventDefault();
    setExpand(!expanded);
  };

  useEffect(() => {
    if (areaFieldRef.current) {
      areaFieldRef.current.focus();
    }
  }, [isAnswering]);

  return isDeleted ? null : (
    <div className={styles.commentContainer}>
      <div className={styles.questionContainer}>
        <img src={QuestionIcon} alt={''} />
        <span>
            {question}
          </span>
        { canAnswer && (
          <button className={styles.expandMoreButton}>
            &#10247;
          </button>
        )}
        <nav className={styles.expandMenu}>
          <div onClick={() => setIsAnswering(!isAnswering)}>
            <img src={ArrowIcon} alt={''} />
            <span>Atsakyti</span>
          </div>
          <div onClick={handleQuestionDelete}>
            <img src={TrashIcon} alt={''} />
            <span>Pašalinti</span>
          </div>
        </nav>
      </div>
      <div
        className={`${styles.answerContainer}  ${isAnswering && styles.answerContainerAnsweringQuestion} ${(!answer && !isAnswering) && styles.answerContainerEmpty}`}
      >
        {/*<span className={styles.date}>2021-08-22</span>*/}
        { !isAnswering && (
          <>
            <Truncate
              className={styles.answer}
              trimWhitespace={true}
              lines={!expanded && 2}
              ellipsis={(
                <span onClick={toggleLines}>...<span style={{ color: '#D07725' }}>
                    <br style={{ display: 'block' }} />Skaityti daugiau...
                  </span></span>
              )}
              onTruncate={handleTruncate}
            >
              <div>
                {answer}
              </div>
            </Truncate>
            {!truncated && expanded && (
              <span onClick={toggleLines} style={{ color: '#D07725' }}> <br style={{ display: 'block' }} />
                  Skaityti mažiau
                </span>
            )}
          </>
        )}
        { isAnswering && (
          <>
            <TextArea
              ref={areaFieldRef}
              className={styles.answerField}
              maxLength={500}
              placeholder={'Rašykite atsakymą...'}
            />
            <div className={styles.submitAnswerButtonContainer}>
              <div className={styles.submitAnswerButton} onClick={handleAnswerSubmit}>
                <img src={SendIcon} alt={''} />
                <span>Išsiųsti</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { Comment };
