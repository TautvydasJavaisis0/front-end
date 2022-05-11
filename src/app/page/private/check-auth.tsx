import * as React from 'react';
import { Redirect, RouteProps } from 'react-router';

import { NavigationService } from 'app/service/navigation-service';
import { connectContext, SettingsProps } from 'app/context';

interface ContextProps {
  authenticated: boolean;
  updateLastLocation: (page: string) => void;
}

interface OwnProps {
  children: React.ReactNode;
}

interface State {
  lastLocation?: string;
}

type Props = OwnProps & ContextProps & RouteProps;

class CheckAuthComponent extends React.Component<Props, State> {

  public readonly state: State = {
    lastLocation: NavigationService.HOME_PATH,
  };

  public componentDidMount() {
    const path = this.props.location?.pathname;

    if (path) {
      this.props.updateLastLocation(path);
      this.setState({ lastLocation: path });
    }
  }

  public componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any) {
    const path = this.props.location?.pathname;
    const prevPath = prevProps.location?.pathname;

    if (path !== prevPath && path) {
      this.props.updateLastLocation(path);
      this.setState({ lastLocation: path });
    }
  }

  public render(): React.ReactNode {
    const {
      authenticated,
      children,
    } = this.props;
    const path = this.props.location?.pathname;
    const correctPath = path && ![NavigationService.LOGIN_PATH, NavigationService.REGISTRATION_PATH].includes(path);

    if (!authenticated) {
      return (
        <Redirect
          to={{
            pathname: NavigationService.LOGIN_PATH,
            state: { previousPath: correctPath ? path : this.state.lastLocation },
          }}
        />
      );
    }

    return children;
  }

}

const mapContextToProps = ({ session: { authenticated }, actions: { updateLastLocation } }: SettingsProps): ContextProps => ({
  authenticated,
  updateLastLocation,
});

const CheckAuth = connectContext(mapContextToProps)(CheckAuthComponent);

export { CheckAuth };
