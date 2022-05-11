import * as React from 'react';
import {NavigationService} from "app/service/navigation-service";

export type CurrentUser = Api.SessionUser | undefined;

export interface Session {
  user: CurrentUser;
  authenticated: boolean;
}

export interface Actions {
  updateSession: (session: Session) => void;
  updateLastLocation: (page: string) => void;
}

export interface SettingsProps {
  actions: Actions;
  session: Session;
  lastPrivatePage: string;
}

const INITIAL_SESSION: Session = {
  user: undefined,
  authenticated: false,
};

const DEFAULT_SETTINGS: SettingsProps = {
  session: INITIAL_SESSION,
  lastPrivatePage: NavigationService.HOME_PATH,
  actions: {
    updateSession: () => undefined,
    updateLastLocation: () => undefined,
  },
};

const settingsContext: React.Context<SettingsProps> = React.createContext<SettingsProps>(DEFAULT_SETTINGS);

function connectContext<TInjectedProps = {}, TOriginalProps = {}>(
  mapContextToProps: (context: SettingsProps, ownProps: TOriginalProps) => TInjectedProps,
): <P extends TOriginalProps>(WrappedComponent: React.ComponentType<P & TInjectedProps>) => React.FC<P> {
  return (Component) =>
    (props) => (
      <settingsContext.Consumer>
        {(settings: SettingsProps) => (
          <Component
            {...mapContextToProps(settings, props)}
            {...props}
          />
        )}
      </settingsContext.Consumer>
    );
}

export {
  settingsContext,
  connectContext,
  INITIAL_SESSION,
};
