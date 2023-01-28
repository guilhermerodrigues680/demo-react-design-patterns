import { useEffect, useState } from "react";
import { type PetImage } from "../../models/pet-image.type";
import catsApi from "../../services/cats-api";
import { PetsRender } from "./PetsRender";

export function PetsContainer() {
  const [fetchedPets, setFetchedPets] = useState<PetImage[]>([]);

  async function fetchPets() {
    const petImgs: PetImage[] = await catsApi.getPets();
    setFetchedPets(petImgs);
  }

  useEffect(() => {
    fetchPets();
  }, []);

  return <PetsRender fetchedData={fetchedPets} />;
}
