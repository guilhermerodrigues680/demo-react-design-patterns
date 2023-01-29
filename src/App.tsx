import { useContext } from "react";
import { withLoader } from "./components/hoc/WithLoader/with-loader";
import { PetsContainer, PetsRender } from "./components/PetsContainer";
import ThemeSwitcher from "./components/provide/ThemeSwitcher";
import LoadingWrapper from "./components/wrapper/LoadingWrapper";
import { ThemeContext } from "./context/theme-context";
import dogsApi from "./services/dogs-api";
import { VERSION_INFO_TXT } from "./config/version-info";

import styles from "./App.module.css";

// usar métodos de uma classe como propriedade pode ocorrer erros com o this,
// assim é necessário fazer com que o this seja referido corretamente.
const getDogs = dogsApi.getPets.bind(dogsApi); // ou: () => dogsApi.getPets();

const DogsRenderWithLoader = withLoader(getDogs)(PetsRender);

function App() {
  const { theme, colorScheme } = useContext(ThemeContext);

  return (
    <div className={styles["app"]}>
      <div>
        <small>{VERSION_INFO_TXT}</small>
        <br />
        <small>
          Tema atual: {theme} (Tema do dispositivo: {colorScheme})
        </small>
      </div>

      <ThemeSwitcher />

      <h3>PetsContainer</h3>
      <PetsContainer />

      <h3>WithLoader</h3>
      <LoadingWrapper fetchFunction={getDogs}>
        {(fd) => (
          <>
            asas <PetsRender fetchedData={fd} />
          </>
        )}
      </LoadingWrapper>

      <h3>DogsRenderWithLoader</h3>
      <DogsRenderWithLoader />
    </div>
  );
}

export default App;
