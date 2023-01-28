import React, {
  type ReactNode,
  useState,
  ReactElement,
  useEffect,
} from "react";

export type WithLoaderProps<P, T> = {
  fetchFunction: () => Promise<T>;
  children: (fd: T) => ReactElement;
};

// https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb
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
