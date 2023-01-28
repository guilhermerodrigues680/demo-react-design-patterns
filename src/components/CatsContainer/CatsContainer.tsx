import { useEffect, useState } from "react";
import type { CatImage } from "./cat-image.type";
import { CatsRender } from "./CatsRender";

export function CatsContainer() {
  // https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t
  const catApiBaseUrl = "https://api.thecatapi.com/v1";
  const catApiImagesUrl = `${catApiBaseUrl}/images/search?limit=10`;

  const [fetchedCats, setFetchedCats] = useState<CatImage[]>([]);

  async function fetchCats() {
    // OBS: fetch simples sem tratamento de erro.
    const catImgs: CatImage[] = await (await fetch(catApiImagesUrl)).json();
    setFetchedCats(catImgs);
  }

  useEffect(() => {
    fetchCats();
  }, []);

  return <CatsRender fetchedData={fetchedCats} />;
}
