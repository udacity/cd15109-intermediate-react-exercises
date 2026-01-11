import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      resetCount: 0,
    };
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error) {
    // Triggers fallback UI on next render
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[ErrorBoundary] Caught render error:", error);
    console.error(
      "[ErrorBoundary] Component stack:",
      errorInfo?.componentStack
    );

    this.setState({ errorInfo });
  }

  handleReset() {
    // Reset the boundary so the app can attempt to render again.
    // resetCount is useful if you want to force remounts later.
    this.setState((prev) => ({
      hasError: false,
      error: null,
      errorInfo: null,
      resetCount: prev.resetCount + 1,
    }));
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background text-foreground">
          <div className="mx-auto grid max-w-2xl gap-4 px-4 py-10">
            <Card>
              <CardHeader className="space-y-2">
                <CardTitle>Something went wrong</CardTitle>
                <p className="text-sm text-muted-foreground">
                  An unexpected error occurred while rendering the app. You can
                  try again, reload the page, or return home.
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button type="button" onClick={this.handleReset}>
                    Try again
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => window.location.reload()}
                  >
                    Reload page
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      window.location.href = "/";
                    }}
                  >
                    Go home
                  </Button>
                </div>

                <details className="rounded-md border bg-card p-3 text-sm">
                  <summary className="cursor-pointer font-medium">
                    Technical details
                  </summary>

                  <div className="mt-3 space-y-2 text-muted-foreground">
                    <div>
                      <span className="font-medium text-foreground">
                        Error:
                      </span>{" "}
                      <code className="wrap-break-word">
                        {this.state.error?.message ?? String(this.state.error)}
                      </code>
                    </div>

                    {this.state.errorInfo?.componentStack ? (
                      <div>
                        <div className="font-medium text-foreground">
                          Component stack:
                        </div>
                        <pre className="mt-2 max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs">
                          {this.state.errorInfo.componentStack.trim()}
                        </pre>
                      </div>
                    ) : null}
                  </div>
                </details>
              </CardContent>
            </Card>

            <p className="text-xs text-muted-foreground">
              Note: Error boundaries catch render errors in React components.
              They do not catch errors inside event handlers or async code.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
