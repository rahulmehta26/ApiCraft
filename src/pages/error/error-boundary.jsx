import { Component } from "react";
import ErrorState from "./error-state";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          onRetry={this.handleRetry}
          errorMessage={this.state.error?.message}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
