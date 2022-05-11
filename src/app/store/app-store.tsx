import * as React from 'react';

import { Actions, INITIAL_SESSION, Session, settingsContext } from 'app/context';
import { NavigationService } from 'app/service/navigation-service';

interface State {
  session: Session;
  features: string[];
  lastPrivatePage: string;
}

class AppStore extends React.Component<{}, State> {

  public readonly state: State = {
    session: INITIAL_SESSION,
    lastPrivatePage: NavigationService.HOME_PATH,
    features: [],
  };

  public render(): React.ReactNode {
    const {
      children,
    } = this.props;

    const {
      session,
      lastPrivatePage,
    } = this.state;

    const actions: Actions = { updateSession: this.updateSession, updateLastLocation: this.updateLastPrivatePage };

    return (
      <settingsContext.Provider value={{ session, lastPrivatePage, actions }}>
        {children}
      </settingsContext.Provider>
    );
  }

  private readonly updateSession = (session: Session): void => {
    this.setState({ session });
  };

  private readonly updateLastPrivatePage = (lastPrivatePage: string): void => {
    this.setState({ lastPrivatePage });
  };
}

export { AppStore };
