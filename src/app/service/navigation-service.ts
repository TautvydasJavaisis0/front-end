import { generatePath } from 'react-router';

import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

class NavigationService {

  public static readonly HOME_PATH_FULL: string = '/home';
  public static readonly HOME_PATH: string = '/';
  public static readonly LOGIN_PATH: string = '/login';
  public static readonly LOGOUT_PATH: string = '/logout';
  public static readonly REGISTRATION_PATH: string = '/registration';
  public static readonly PAGE_NOT_FOUND_PATH: string = '/not-found';
  public static readonly CREATE_INITIATIVE_PATH: string = '/create-initiative';
  public static readonly COMPETENCE_SELECT_PATH: string = '/competence-select';
  public static readonly INITIATIVE_LIST_PATH: string = '/initiative-list';
  public static readonly FILTER_INITIATIVE_PATH: string = '/filter-initiative';
  public static readonly INITIATIVE_MAP_PATH: string = '/initiative-map';
  public static readonly INITIATIVE_DETAILS_PATH: string = '/initiative/:id?';
  public static readonly USER_PROFILE_PATH: string = '/user-profile';
  public static readonly USERS_LIST_PATH: string = '/users-list/:id?';
  public static readonly BDAR_PATH: string = '/BDAR';
  public static readonly USERS_CREATED_INITIATIVES_PATH: string = '/users-created-initiatives';
  public static readonly USERS_VOLUNTEERING_HISTORY_PATH: string = '/users-volunteering-history';

  public readonly goBack = (): void => {
    history.goBack();
  };

  public readonly goToPath = (path: string): void => {
    history.push(path);
  };

  public readonly redirectToDefaultPage = (): void => {
    history.push(NavigationService.HOME_PATH_FULL);
  };

  public readonly redirectToLoginPage = (): void => {
    history.push(NavigationService.LOGIN_PATH);
  };

  public readonly redirectToLogoutPage = (): void => {
    history.push(NavigationService.LOGOUT_PATH);
  };

  // public readonly redirectToUserDetailsPage = (id?: number): void => {
  //   history.push(generatePath(NavigationService.USER_DETAILS_PATH, { id }));
  // };

  public readonly redirectToCreateInitiativePage = (): void => {
    history.push(NavigationService.CREATE_INITIATIVE_PATH);
  };

  public readonly redirectToCompetenceSelectPage = (): void => {
    history.push(NavigationService.COMPETENCE_SELECT_PATH);
  };

  public readonly redirectToInitiativeDetailsPage = (id?: number): void => {
    history.push(generatePath(NavigationService.INITIATIVE_DETAILS_PATH, { id }));
  };

  public readonly redirectToRegistrationPage = (): void => {
    history.push(NavigationService.REGISTRATION_PATH);
  };

  public readonly redirectToInitiativeListPage = (params: any): void => {
    history.push(NavigationService.INITIATIVE_LIST_PATH, params);
  };

  public readonly redirectToInitiativeMapPage = (): void => {
    history.push(NavigationService.INITIATIVE_MAP_PATH);
  };

  public readonly redirectToFilterInitativePage = (): void => {
    history.push(NavigationService.FILTER_INITIATIVE_PATH);
  };

  public readonly redirectToUserProfilePage = (): void => {
    history.push(NavigationService.USER_PROFILE_PATH);
  };

  public readonly redirectToUserListPage = (id?: string): void => {
    history.push(generatePath(NavigationService.USERS_LIST_PATH, { id }));
  };

  public readonly redirectToBDARPage = (): void => {
    history.push(NavigationService.BDAR_PATH);
  };

  public readonly redirectTOUsersCreatedInitiativesPage = (): void => {
    history.push(NavigationService.USERS_CREATED_INITIATIVES_PATH);
  }

  public readonly redirectToUsersVolunteeringHistory = (): void => {
    history.push(NavigationService.USERS_VOLUNTEERING_HISTORY_PATH);
  }
}

const navigationService = new NavigationService();

export { NavigationService, navigationService };
