import { CancelSource, RestService } from 'app/api/common';

class DistrictsService {

  private static readonly DISTRICTS_PATH: string = '/districts';

  private readonly restService: RestService;

  constructor(cancelSource: CancelSource = new CancelSource()) {
    this.restService = cancelSource.service;
  }

  public readonly getDistricts = (): Promise<Api.DistrictsDto[]> =>
    this.restService.get<Api.DistrictsDto[]>(DistrictsService.DISTRICTS_PATH);

}

const districtsService = new DistrictsService();

export { districtsService };
