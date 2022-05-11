import React from 'react';

import { navigationService } from 'app/service/navigation-service';
import { sessionService } from 'app/api/service/session-service';
import { PageLoadingSpinner } from 'app/page/common/page-loading-spinner/page-loading-spinner';
import { loggerService } from 'app/service/logger-service';
import { connectContext, Session as ContextSession, SettingsProps } from 'app/context';

interface ContextProps {
  updateSession: (session: ContextSession) => void;
}

class LogoutPageComponent extends React.Component<ContextProps, {}> {

  public componentDidMount(): void {
    sessionService.logout()
      .then(() => {
        navigationService.redirectToDefaultPage();
        this.props.updateSession({ user: { fullName: undefined, email: undefined, id: undefined }, authenticated: false });
      })
      .catch(error => { loggerService.error('Error occurred when logging out', error); });
  }

  public render(): React.ReactNode {
    return (
      <PageLoadingSpinner />
    );
  }

}
const mapContextToProps = (
  { actions: { updateSession } }: SettingsProps,
): ContextProps => ({
  updateSession,
});

const LogoutPage = connectContext(mapContextToProps)(LogoutPageComponent);

export { LogoutPage };
