import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App render error:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="app-error" role="alert">
          <h1>Something went wrong</h1>
          <p>
            The calculator could not load. Try refreshing the page. If this
            keeps happening, stop the dev server and run{' '}
            <code>npm run dev</code> again from the <code>calculator-app</code>{' '}
            folder.
          </p>
          <pre>{this.state.error.message}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}
