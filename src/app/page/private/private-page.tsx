import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Router } from 'react-router-dom';

import { history, NavigationService } from 'app/service/navigation-service';
import { NotFoundPage } from 'app/page/not-found/not-found-page';
import { CreateInitiativePage } from 'app/page/create-initiative/create-initiative-page';
import { UserProfilePage } from 'app/page/user-profile/user-profile-page';
import { LogoutPage } from 'app/page/logout/logout-page';

import {InitiativeParticipantsList} from "app/page/user-list/initiative-participants-list";
import { MyCreatedInitiatives } from 'app/page/my-created-initiatives/my-created-initiatives';
import { VolunteeringHistoryPage } from 'app/page/volunteering-history/volunteering-history';


class PrivatePage extends React.Component {

  public render(): React.ReactNode {
    return (
      <Router history={history}>
        <Switch>
          <Route
            path={NavigationService.LOGOUT_PATH}
            component={LogoutPage}
            exact={true}
          />
          {/*<Route*/}
          {/*  path={NavigationService.USER_DETAILS_PATH}*/}
          {/*  component={UserDetailsPage}*/}
          {/*/>*/}
          <Route
            path={NavigationService.USERS_LIST_PATH}
            component={InitiativeParticipantsList}
            exact={true}
          />
          <Route
            path={NavigationService.CREATE_INITIATIVE_PATH}
            component={CreateInitiativePage}
            exact={true}
          />
          <Route
            path={NavigationService.USER_PROFILE_PATH}
            component={UserProfilePage}
            exact={true}
          />
          <Route
            path={NavigationService.USERS_CREATED_INITIATIVES_PATH}
            component={MyCreatedInitiatives}
            exact={true}
          />
          <Route
            path={NavigationService.USERS_VOLUNTEERING_HISTORY_PATH}
            component={VolunteeringHistoryPage}
            exact={true}
          />
          <Route
            path={NavigationService.PAGE_NOT_FOUND_PATH}
            component={NotFoundPage}
            exact={true}
          />
          <Redirect to={NavigationService.PAGE_NOT_FOUND_PATH} />
        </Switch>
      </Router>
    );
  }

}

export { PrivatePage };
