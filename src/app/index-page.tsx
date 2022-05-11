import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { message } from 'antd';

import { LoginPage } from 'app/page/login/login-page';
import { history, NavigationService } from 'app/service/navigation-service';
import { PrivatePage } from 'app/page/private/private-page';
import { CheckAuth } from 'app/page/private/check-auth';
import { HomePage } from 'app/page/home/home-page';
import { RegistrationPage } from 'app/page/registration/registration-page';
import { CompetenceSelectPage } from 'app/page/competence-select/competence-select-page';
import { InitiativeMapPage } from 'app/page/initiative-map/initiative-map-page';
import { InitiativeListPage } from 'app/page/initiative-list/initative-list-page';
import { FilterInitiativePage } from 'app/page/filter-initiative/filter-initiative-page';
import { InitiativeDetailsPage } from 'app/page/initiative-details/initiative-details-page';

class IndexPage extends React.Component {

  public state = {
    features: [],
    endDate: undefined,
    startDate: undefined,
    location: undefined,
  };

  public handleToggleHex = (id: string) => {

    if (this.state.features.length >= 3) {
      this.setState({ features: this.state.features.filter(_feature => _feature !== id) });
      if (!this.state.features.some(_feature => _feature === id)) {
        message.error('Negalima pasirinkti daugiau nei 3 savybių!');
      }

    } else {
      if (this.state.features.some(_feature => _feature === id)) {
        this.setState({ features: this.state.features.filter(_feature => _feature !== id) });
      } else {
        this.setState({ features: [...this.state.features, id] });
      }
    }

  };

  public handleFilterState = (state: any) => {
    this.setState(state);
  };

  public render(): React.ReactNode {

    return (
      <Router history={history}>
        <Switch>
          <Route
            path={NavigationService.HOME_PATH}
            component={HomePage}
            exact={true}
          />
          <Route
            path={NavigationService.HOME_PATH_FULL}
            component={HomePage}
            exact={true}
          />
          <Route
            path={NavigationService.LOGIN_PATH}
            component={LoginPage}
            exact={true}
          />
          <Route
            path={NavigationService.COMPETENCE_SELECT_PATH}
            render={() => <CompetenceSelectPage features={this.state.features} onToggleHex={this.handleToggleHex} />}
          />
          <Route
            path={NavigationService.INITIATIVE_LIST_PATH}

            render={() => <InitiativeListPage
              features={(this.state.features || []).length === 0 ? [
                'pilietiškumas',
                'lyderystė',
                'komunikacija',
                'tolerancija',
                'solidarumas',
                'kūrybiškumas'] : this.state.features.map((feature: string) => feature.toLowerCase())}
                                              endDate={this.state.endDate}
                                              startDate={this.state.startDate}
                                              location={this.state.location} />}
          />
          <Route
            path={NavigationService.INITIATIVE_MAP_PATH}

            render={() => <InitiativeMapPage
              features={(this.state.features || []).length === 0 ? [  'pilietiškumas',
                'lyderystė',
                'komunikacija',
                'tolerancija',
                'solidarumas',
                'kūrybiškumas'] : this.state.features.map((feature: string) => feature.toLowerCase())}
              endDate={this.state.endDate}
              startDate={this.state.startDate}
              location={this.state.location} />}
          />
          <Route
            path={NavigationService.INITIATIVE_MAP_PATH}
            component={InitiativeMapPage}
            exact={true}
          />
          <Route
            path={NavigationService.REGISTRATION_PATH}
            component={RegistrationPage}
            exact={true}
          />
          <Route
            path={NavigationService.FILTER_INITIATIVE_PATH}
            render={() => <FilterInitiativePage
              features={this.state.features}
              endDate={this.state.endDate}
              startDate={this.state.startDate}
              location={this.state.location}
              setParentState={this.handleFilterState}
            />}
          />
          <Route
            path={NavigationService.INITIATIVE_DETAILS_PATH}
            component={InitiativeDetailsPage}
            exact={true}
          />
          <CheckAuth>
            <Route
              path={NavigationService.HOME_PATH}
              component={PrivatePage}
            />
          </CheckAuth>
        </Switch>
      </Router>
    );
  }

}
export { IndexPage };
