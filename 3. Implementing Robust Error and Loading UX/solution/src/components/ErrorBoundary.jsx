import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.reset = this.reset.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  reset() {
    this.setState({ hasError: false });
    this.props.onReset?.();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="card">
          <h1>Something went wrong</h1>
          <p className="subtitle">
            This section crashed while rendering. You can try again.
          </p>
          <div style={{ marginTop: 14 }}>
            <button className="btn btnPrimary" onClick={this.reset}>
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
