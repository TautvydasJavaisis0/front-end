import { CancelSource, RestService } from 'app/api/common';

export interface UserFeaturesDto { [key: string]: number; }

class UserService {

  private static readonly USER_PATH: string = '/users';
  private static readonly USER_FEATURE_STATS_PATH: string = '/users/feature-stats';
  private static readonly USER_STATS_PATH: string = '/users/stats';

  private readonly restService: RestService;

  constructor(cancelSource: CancelSource = new CancelSource()) {
    this.restService = cancelSource.service;
  }

  public readonly getUsers = (): Promise<Api.UserDto[]> =>
    this.restService.get<Api.UserDto[]>(UserService.USER_PATH);

  public readonly getUser = (id: number): Promise<Api.UserDto> =>
    this.restService.get<Api.UserDto>(`${UserService.USER_PATH}/${id}`);

  public readonly createUser = (user: Api.UserDto): Promise<Api.UserDto> =>
    this.restService.post<Api.UserDto>(UserService.USER_PATH, user);

  public readonly updateUser = (user: Api.UserDto): Promise<Api.UserDto> =>
    this.restService.put<Api.UserDto>(UserService.USER_PATH, user);

  public readonly deleteUser = (id: number): Promise<void> =>
    this.restService.delete(`${UserService.USER_PATH}/${id}`);

  public readonly getUsersByInitiative = (id: number): Promise<Api.UserDto[]> =>
    this.restService.get<Api.UserDto[]>(`${UserService.USER_PATH}/by-initiative/${id}`);


  public readonly getUserFeatureStats = (id: number): Promise<UserFeaturesDto> =>
    this.restService.get<UserFeaturesDto>(`${UserService.USER_FEATURE_STATS_PATH}?id=${id}`);

  public readonly getUserStats = (id: number): Promise<Api.UserStatsDto> =>
    this.restService.get<Api.UserStatsDto>(`${UserService.USER_STATS_PATH}?id=${id}`);

}

const userService = new UserService();

export { userService };
