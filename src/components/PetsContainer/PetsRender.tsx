import type { PetImage } from "../../models/pet-image.type";
import styles from "./PetsRender.module.css";

export type PetsRenderProps = {
  fetchedData: PetImage[];
  name?: string;
};

export function PetsRender({ fetchedData }: PetsRenderProps) {
  return (
    <div className={styles["pet"]}>
      {fetchedData.map((pet, idx) => (
        <img key={idx} src={pet.url} />
      ))}
    </div>
  );
}
