import { type ReactNode, useState, useEffect } from "react";

// https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb

export type LoadingWrapperProps<T> = {
  fetchFunction: () => Promise<T>;
  children: (fd: T) => ReactNode;
};

/**
 * É um componente que recebe uma função para buscar dados e uma função para gerar
 * um componente filho assim que os dados forem obtidos e ele renderiza um
 * carregador enquanto os dados são obtidos.
 */
export function LoadingWrapper<T>({
  children,
  fetchFunction,
}: LoadingWrapperProps<T>) {
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
