import React, {
  type ReactNode,
  useState,
  ReactElement,
  useEffect,
} from "react";

export type WithLoaderProps<P, T> = {
  fetchFunction: () => Promise<T>;

  //   children: React.ComponentType<P & ExtraInfoType & { fd: T }>;
  children: (fd: T) => ReactElement;
};

export function WithLoader<P, T>({
  children,
  fetchFunction,
}: WithLoaderProps<P, T>) {
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

  // OBS: Usando o `d!` pois se não está carregando, o `d` não será undefined.
  return (
    <>{loading ? <div className="loader">"loading..."</div> : children(d!)}</>
  );
}

// First we need to add a type to let us extend the incoming component.
type ExtraInfoType = {
  extraInfo: string;
};

// Mark the function as a generic using P (or whatever variable you want)
export function withLoader<P>(
  // Then we need to type the incoming component.
  // This creates a union type of whatever the component
  // already accepts AND our extraInfo prop
  WrappedComponent: React.ComponentType<P & ExtraInfoType>
) {
  const [extraInfo, setExtraInfo] = useState("");
  setExtraInfo("important data.");

  const ComponentWithExtraInfo = (props: P) => {
    // At this point, the props being passed in are the original props the component expects.
    return <WrappedComponent {...props} extraInfo={extraInfo} />;
  };

  return ComponentWithExtraInfo;
}
