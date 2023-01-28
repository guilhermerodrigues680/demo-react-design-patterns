import { useEffect, useState } from "react";
import type { PetImage } from "./pet-image.type";
import { PetsRender } from "./PetsRender";

export function PetsContainer() {
  // https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t
  const catApiBaseUrl = "https://api.thecatapi.com/v1";
  const catApiImagesUrl = `${catApiBaseUrl}/images/search?limit=10`;

  const [fetchedPets, setFetchedPets] = useState<PetImage[]>([]);

  async function fetchPets() {
    // OBS: fetch simples sem tratamento de erro.
    const petImgs: PetImage[] = await (await fetch(catApiImagesUrl)).json();
    setFetchedPets(petImgs);
  }

  useEffect(() => {
    fetchPets();
  }, []);

  return <PetsRender fetchedData={fetchedPets} />;
}
