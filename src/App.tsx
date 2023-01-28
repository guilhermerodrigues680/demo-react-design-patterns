import { useContext } from "react";
import "./App.css";
import { CatsContainer, CatsRender } from "./components/CatsContainer";
import { CatImage } from "./components/CatsContainer/cat-image.type";
import WithLoader from "./components/hoc/WithLoader";
import { withLoader } from "./components/hoc/WithLoader/with-loader";
import ThemeSwitcher from "./components/provide/ThemeSwitcher";
import { ThemeContext } from "./context/theme-context";

async function fetchCats(): Promise<CatImage[]> {
  const catApiBaseUrl = "https://api.thecatapi.com/v1";
  const catApiImagesUrl = `${catApiBaseUrl}/images/search?limit=10`;

  // OBS: fetch simples sem tratamento de erro.
  const catImgs: CatImage[] = await (await fetch(catApiImagesUrl)).json();
  return catImgs;
}

// const CatsRenderWithLoader = withLoader(CatsRender, fetchCats);
const CatsRenderWithLoader = withLoader(fetchCats)(CatsRender);

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="App">
      <div>Tema atual: {theme}</div>
      <div>
        switch: <ThemeSwitcher />
      </div>

      <h3>CatsContainer</h3>
      <CatsContainer />

      <h3>WithLoader</h3>
      <WithLoader fetchFunction={fetchCats}>
        {(fd) => (
          <>
            asas {console.debug(fd)} <CatsRender fetchedData={fd} />
          </>
        )}
      </WithLoader>

      <h3>CatsRenderWithLoader</h3>
      <CatsRenderWithLoader />
    </div>
  );
}

export default App;
