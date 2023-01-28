import { useContext } from "react";
import WithLoader from "./components/hoc/WithLoader";
import { withLoader } from "./components/hoc/WithLoader/with-loader";
import { PetsContainer, PetsRender } from "./components/PetsContainer";
import ThemeSwitcher from "./components/provide/ThemeSwitcher";
import { ThemeContext } from "./context/theme-context";
import dogsApi from "./services/dogs-api";

import "./App.css";

// usar métodos de uma classe como propriedade pode ocorrer erros com o this,
// assim é necessário fazer com que o this seja referido corretamente.
const getDogs = dogsApi.getPets.bind(dogsApi); // ou: () => dogsApi.getPets();

const DogsRenderWithLoader = withLoader(getDogs)(PetsRender);

function App() {
  const { theme, colorScheme } = useContext(ThemeContext);

  return (
    <div className="App">
      <div>
        Tema atual: {theme}, Color Scheme: {colorScheme}
      </div>
      <div>
        switch: <ThemeSwitcher />
      </div>

      <h3>PetsContainer</h3>
      <PetsContainer />

      <h3>WithLoader</h3>
      <WithLoader fetchFunction={getDogs}>
        {(fd) => (
          <>
            asas <PetsRender fetchedData={fd} />
          </>
        )}
      </WithLoader>

      <h3>DogsRenderWithLoader</h3>
      <DogsRenderWithLoader />
    </div>
  );
}

export default App;
