import { CancelSource, RestService } from 'app/api/common';

class InitiativeService {

  private static readonly INITIATIVE_PATH: string = '/initiatives';

  private readonly restService: RestService;

  constructor(cancelSource: CancelSource = new CancelSource()) {
    this.restService = cancelSource.service;
  }

  public readonly createInitiative = (initiative: Api.InitiativeCreateDto): Promise<Api.InitiativeCreateDto> =>
    this.restService.post<Api.InitiativeCreateDto>(InitiativeService.INITIATIVE_PATH, initiative);

  public readonly removeInitiative = (id: string): Promise<Api.InitiativeDto> =>
    this.restService.delete<Api.InitiativeDto>(`${InitiativeService.INITIATIVE_PATH}/${id}`);

  public readonly getInitiativeById = (id: string): Promise<Api.InitiativeDto> =>
    this.restService.get<Api.InitiativeDto>(`${InitiativeService.INITIATIVE_PATH}/${id}`);

  public readonly getInitiatives = (featureQuery: string[], endDate?: string, startDate?: string, location?: string): Promise<Api.InitiativeDto[]> =>
    this.restService.get<Api.InitiativeDto[]>(`${InitiativeService.INITIATIVE_PATH}/filter`,
      {
        params: {
          startDate,
          endDate,
          location,
          features: featureQuery.join(','),
        },
      });

  public readonly getCreatedOldInitiatives = (): Promise<Api.InitiativeDto[]> =>
    this.restService.get<Api.InitiativeDto[]>(`${InitiativeService.INITIATIVE_PATH}/created-old`);

  public readonly getCreatedActiveInitiatives = (): Promise<Api.InitiativeDto[]> =>
    this.restService.get<Api.InitiativeDto[]>(`${InitiativeService.INITIATIVE_PATH}/created-active`);

  public readonly getAppliedActiveInitiatives = (): Promise<Api.InitiativeDto[]> =>
    this.restService.get<Api.InitiativeDto[]>(`${InitiativeService.INITIATIVE_PATH}/applied-active`);

  public readonly getAppliedOldInitiatives = (): Promise<Api.InitiativeDto[]> =>
    this.restService.get<Api.InitiativeDto[]>(`${InitiativeService.INITIATIVE_PATH}/applied-old`);

  public readonly getEndedInitiative = (id: number): Promise<boolean> =>
    this.restService.get<boolean>(`${InitiativeService.INITIATIVE_PATH}/has-ended?id=${id}`);
}


const initiativeService = new InitiativeService();

export { initiativeService };
