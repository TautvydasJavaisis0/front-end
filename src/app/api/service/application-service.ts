import { CancelSource, RestService } from 'app/api/common';

class ApplicationService {

  private static readonly APPLICAITON_PATH: string = '/initiatives/applicants';

  private readonly restService: RestService;

  constructor(cancelSource: CancelSource = new CancelSource()) {
    this.restService = cancelSource.service;
  }

  public readonly putApplicant = (initiativeId: string): Promise<Api.InitiativeDto> =>
    this.restService.put(`${ApplicationService.APPLICAITON_PATH}?initiativeID=${initiativeId}`);

  public readonly removeApplicant = (initiativeId: string): Promise<Api.InitiativeDto> =>
    this.restService.delete(`${ApplicationService.APPLICAITON_PATH}?initiativeID=${initiativeId}`);

  public readonly checkIsApplicantApplied = (initiativeId: string): Promise<boolean> =>
    this.restService.get<boolean>(`${ApplicationService.APPLICAITON_PATH}/is-applied?initiativeID=${initiativeId}`);

  public readonly putApplicantRate = (userId: number, initiativeId: number, attended: boolean, rated: boolean): Promise<Api.InitiativeDto> =>
    this.restService.put(`${ApplicationService.APPLICAITON_PATH}/rate`,{ userId, initiativeId, attended, rated})

  public readonly getAppicantIsRated = (initiativeID: number, userID: number): Promise<boolean> =>
    this.restService.get(`${ApplicationService.APPLICAITON_PATH}/is-rated?initiativeID=${initiativeID}&userID=${userID}`)
}

const applicationService = new ApplicationService();

export { applicationService };
