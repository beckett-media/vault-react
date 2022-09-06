import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorsHere
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className='error-boundary'>
          Something went wrong. Please refresh the page or &nbsp;
          <Link className='home-button' to='my-collection'>
            go home
          </Link>
          .
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
