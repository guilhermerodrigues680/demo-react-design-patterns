import { useEffect, useState } from "react";

// First we need to add a type to let us extend the incoming component.
type ExtraInfoType<T> = {
  fetchedData: T;
};

// Mark the function as a generic using P (or whatever variable you want)
export function withLoader0<P, T>(
  WrappedComponent: React.ComponentType<P & ExtraInfoType<T>>,
  fetchFunction: () => Promise<T>
) {
  const [loading, setLoading] = useState(true);
  const [d, setD] = useState<T>();

  async function loaddddd() {
    try {
      setLoading(true);
      const d = await fetchFunction();
      setD(d);
    } catch (error) {
      // TODO
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loaddddd();
  }, []);

  // At this point, the props being passed in are the original props the component expects.
  const ComponentWithExtraInfo = (props: P) => (
    <>
      {loading ? (
        <div className="loader">"loading..."</div>
      ) : (
        d && <WrappedComponent {...props} fetchedData={d} />
      )}
      ;
    </>
  );

  return ComponentWithExtraInfo;
}

// https://react-typescript-cheatsheet.netlify.app/docs/hoc/excluding_props/
export function withLoader<TF>(fetchFunction: () => Promise<TF>) {
  return function <T extends ExtraInfoType<TF>>(
    Component: React.ComponentType<T>
  ) {
    return function (props: Omit<T, "fetchedData">): JSX.Element {
      const newProps = { ...props } as T;

      const [loading, setLoading] = useState(true);
      const [d, setD] = useState<TF>();

      async function loaddddd() {
        try {
          setLoading(true);
          const d = await fetchFunction();
          setD(d);
        } catch (error) {
          // TODO
        } finally {
          setLoading(false);
        }
      }

      useEffect(() => {
        loaddddd();
      }, []);

      return loading ? (
        <div className="loader">"loading..."</div>
      ) : (
        <Component {...newProps} fetchedData={d} />
      );
    };
  };
}
