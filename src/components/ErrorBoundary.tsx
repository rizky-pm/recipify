import { Component, ErrorInfo, ReactNode } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import Logo from './Logo';
import TypographyH1 from './TypographyH1';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Button } from './ui/button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  handleRetry = () => {
    window.location.reload();
  };

  componentDidMount(): void {
    scroll.scrollToTop();
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <MaxWidthWrapper>
          <div className='flex justify-center h-screen items-center w-full'>
            <div className='grid place-items-center'>
              <Logo />
              <TypographyH1 className='text-center text-xl md:text-4xl mt-4'>
                Oops! Something went wrong.
              </TypographyH1>
              <p className='text-muted-foreground mt-2 text-center text-sm md:text-base'>
                Our app encountered an error while loading. Please try
                refreshing the page or check back later.
              </p>
              <Button onClick={this.handleRetry} className='mt-2'>
                Reload
              </Button>
            </div>
          </div>
        </MaxWidthWrapper>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
