import { CancelSource, RestService } from 'app/api/common';

class CommentsService {

  private static readonly ALL_COMMENTS_PATH: string = '/comment';
  private static readonly QUESTION_PATH: string = '/comment/question';
  private static readonly ANSWER_PATH: string = '/comment/answer';

  private readonly restService: RestService;

  constructor(cancelSource: CancelSource = new CancelSource()) {
    this.restService = cancelSource.service;
  }

  public readonly getAllComments = (id: number): Promise<Api.QuestionDto[]> =>
    this.restService.get<Api.QuestionDto[]>(`${CommentsService.ALL_COMMENTS_PATH}/${id}`);

  public readonly postQuestion = (question: Api.QuestionCreationDto): Promise<Api.QuestionDto> =>
    this.restService.post<Api.QuestionDto>(CommentsService.QUESTION_PATH, question);

  public readonly postAnswer = (answer: Api.AnswerCreationDto): Promise<Api.AnswerDto> =>
    this.restService.post<Api.AnswerDto>(CommentsService.ANSWER_PATH, answer);

  public readonly deleteQuestion = (id: number): Promise<void> =>
    this.restService.delete(`${CommentsService.QUESTION_PATH}/${id}`);

  public readonly deleteAnswer = (id: number): Promise<void> =>
    this.restService.delete(`${CommentsService.ANSWER_PATH}/${id}`);
}

const commentsService = new CommentsService();

export { commentsService, CommentsService };
