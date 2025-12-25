import { Component } from "react";
import ErrorState from "./error-state";
import { logError } from "../../utils/error-handlers";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    logError(error, 'React Error Boundary', {
      componentStack: info.componentStack
    })
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {

      const userMessage = "Something went wrong. Please refresh the page.";
      return (
        <ErrorState
          onRetry={this.handleRetry}
          errorMessage={userMessage}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
