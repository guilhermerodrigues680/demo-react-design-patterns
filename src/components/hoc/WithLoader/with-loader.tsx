import { useEffect, useState } from "react";

// https://react-typescript-cheatsheet.netlify.app/docs/hoc/excluding_props/

/**
 * O componente de entrada deve extender esse tipo.
 * Se não for possivel, basta criar um Wrapper
 */
export type WithLoaderType<T> = {
  fetchedData: T;
};

/**
 * withLoader é uma HOF (Função de ordem superior) que recebe uma função para buscar dados
 * e retorna um HOC (componente de ordem superior) que busca dados usando a função de busca fornecida
 * e renderiza um carregador enquanto os dados estão sendo buscados.
 * @template TF O tipo dos dados buscados
 * @param fetchFunction função para buscar dados
 * @returns HOC (componente de ordem superior)
 */
export function withLoader<TF>(fetchFunction: () => Promise<TF>) {
  return function <T extends WithLoaderType<TF>>(
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
