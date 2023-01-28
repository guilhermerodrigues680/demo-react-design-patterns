import { useContext } from "react";
import "./App.css";
import { CatsContainer, CatsRender } from "./components/CatsContainer";
import { CatImage } from "./components/CatsContainer/cat-image.type";
import WithLoader from "./components/hoc/WithLoader";
import { withLoader } from "./components/hoc/WithLoader/with-loader";
import ThemeSwitcher from "./components/provide/ThemeSwitcher";
import { ThemeContext } from "./context/theme-context";

async function fetchDogs(): Promise<CatImage[]> {
  const dogApiBaseUrl = "https://api.thedogapi.com/v1";
  const dogApiImagesUrl = `${dogApiBaseUrl}/images/search?limit=10`;

  // OBS: fetch simples sem tratamento de erro.
  const dogImgs: CatImage[] = await (await fetch(dogApiImagesUrl)).json();
  return dogImgs;
}

const CatsRenderWithLoader = withLoader(fetchDogs)(CatsRender);

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

      <h3>CatsContainer</h3>
      <CatsContainer />

      <h3>WithLoader</h3>
      <WithLoader fetchFunction={fetchDogs}>
        {(fd) => (
          <>
            asas {/*console.debug(fd)*/} <CatsRender fetchedData={fd} />
          </>
        )}
      </WithLoader>

      <h3>CatsRenderWithLoader</h3>
      <CatsRenderWithLoader />
    </div>
  );
}

export default App;
