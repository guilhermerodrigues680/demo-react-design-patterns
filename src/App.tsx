import { useContext } from "react";
import "./App.css";
import { PetsContainer, PetsRender } from "./components/PetsContainer";
import { PetImage } from "./components/PetsContainer/pet-image.type";
import WithLoader from "./components/hoc/WithLoader";
import { withLoader } from "./components/hoc/WithLoader/with-loader";
import ThemeSwitcher from "./components/provide/ThemeSwitcher";
import { ThemeContext } from "./context/theme-context";

async function fetchDogs(): Promise<PetImage[]> {
  const dogApiBaseUrl = "https://api.thedogapi.com/v1";
  const dogApiImagesUrl = `${dogApiBaseUrl}/images/search?limit=10`;

  // OBS: fetch simples sem tratamento de erro.
  const dogImgs: PetImage[] = await (await fetch(dogApiImagesUrl)).json();
  return dogImgs;
}

const DogsRenderWithLoader = withLoader(fetchDogs)(PetsRender);

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
      <WithLoader fetchFunction={fetchDogs}>
        {(fd) => (
          <>
            asas {/*console.debug(fd)*/} <PetsRender fetchedData={fd} />
          </>
        )}
      </WithLoader>

      <h3>DogsRenderWithLoader</h3>
      <DogsRenderWithLoader />
    </div>
  );
}

export default App;
