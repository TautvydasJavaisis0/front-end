import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';

import { ReactComponent as HelpCircle } from 'app/resources/icons/help-circle.svg';
import { commentsService } from 'app/api/service/comments-service';

import { Comment } from './single-comment/comment';

import styles from './comments.module.scss';

export type Comments = {
  questionId?: number;
  question?: string;
  answer?: string
}[];

interface OwnProps {
  initiativeId: number;
  toggleAskQuestionWindow: () => void;
  login: () => void;
  isOwner: boolean;
  isLoggedIn: boolean;
}

type Props = OwnProps;

const CommentsContainer: React.FC<Props> = ({ initiativeId, toggleAskQuestionWindow, isOwner, isLoggedIn, login }) => {
  const [renderAll, setRenderAll] = useState(false);
  const [comments, setComments] = useState<Comments>([]);

  useEffect(() => {
    commentsService.getAllComments(initiativeId)
      .then((commentsResponse) => {
        let questionsWithAnswers: number[] = [];
        let finalComments: Comments = [];
        // Filtering comments
        for (const commentDto of commentsResponse) {
          if (commentDto.id && questionsWithAnswers.indexOf(commentDto.id) !== -1) { continue; }
          // If comment has an answer comment, remembering question id
          if (commentDto.answer?.id) {
            questionsWithAnswers = [...questionsWithAnswers, commentDto.answer.id];
            finalComments = [...finalComments, {
              questionId: commentDto.answer.id,
              question: commentDto.text,
              answer: commentDto.answer.text,
            }];
          } else {
            finalComments = [...finalComments, {
              questionId: commentDto.id,
              question: commentDto.text,
            }];
          }
        }
        setComments(finalComments);
      })
      .catch(() => message.error('Iškilo problema gaunant iniciatyvos komentarus'));
  }, [initiativeId]);

  return (
  <div>
    <h3 className={styles.commentSectionTitle}>Iškilo klausimų apie šią iniciatyvą?</h3>
    <Button
      type="default"
      htmlType="button"
      className={styles.askButton}
      onClick={isLoggedIn ? toggleAskQuestionWindow : login}
      icon={<HelpCircle />}
    >
      Užduok klausimą
    </Button>
    { comments.length > 0 && (
      <>
        <h2 className={styles.commentSectionSmallerTitle}>Savanorių užduodami klausimai</h2>
        {/* If there are 3 or less comments or expanded */}
        { (comments.length < 4 || renderAll) && (
          comments.map((comment, i) =>
            <Comment
              key={i}
              initiativeId={initiativeId}
              questionId={comment.questionId}
              question={comment.question}
              answer={comment.answer}
              canAnswer={comment.answer === undefined && isOwner}
            />,
          ))
        }
        {/* If there are more than 4 comments and is expanded */}
        { (comments.length >= 4 && renderAll) && (
          <div className={styles.expandCommentSectionButton} onClick={() => setRenderAll(false)}>
            Rodyti mažiau klausimų
          </div>
          )}
        {/* If there are more than 3 comments and not expanded */}
        { comments.length >= 4 && !renderAll && (
          <>
            <Comment
              initiativeId={initiativeId}
              questionId={comments[0].questionId}
              question={comments[0].question}
              answer={comments[0].answer}
              canAnswer={comments[0].answer === undefined && isOwner}
            />
            <Comment
              initiativeId={initiativeId}
              questionId={comments[1].questionId}
              question={comments[1].question}
              answer={comments[1].answer}
              canAnswer={comments[1].answer === undefined && isOwner}
            />
            <Comment
              initiativeId={initiativeId}
              questionId={comments[2].questionId}
              question={comments[2].question}
              answer={comments[2].answer}
              canAnswer={comments[2].answer === undefined && isOwner}
            />
            <div className={styles.expandCommentSectionButton} onClick={() => setRenderAll(true)}>
              Rodyti visus {comments.length} klausimų
            </div>
          </>
        )}
      </>
    )}
  </div>
  );
};

export { CommentsContainer };
