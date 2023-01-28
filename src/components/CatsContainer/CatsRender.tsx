import type { CatImage } from "./cat-image.type";
import styles from "./CatsRender.module.css";

export type CatsRenderProps = {
  fetchedData: CatImage[];
  name?: string;
};

export function CatsRender({ fetchedData }: CatsRenderProps) {
  return (
    <div className={styles["cat"]}>
      {fetchedData.map((cat, idx) => (
        <img key={idx} src={cat.url} />
      ))}
    </div>
  );
}
