import type { ComponentType } from "react";
import { useEffect } from "react";

export const withPageTitle = <P extends object>(
  WrappedComponent: ComponentType<P>,
  title: string
) => {
  return (props: P) => {
    useEffect(() => {
      document.title = title;
    }, []);
    return <WrappedComponent {...props} />;
  };
};