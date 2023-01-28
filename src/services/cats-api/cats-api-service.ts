import { PetImage } from "../../models/pet-image.type";
import { ApiService } from "../interfaces/api-service.type";

export class CatsApiServiceImpl implements ApiService {
  // https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t
  private readonly _catApiBaseUrl = "https://api.thecatapi.com/v1";

  constructor() {}

  public async getPets(): Promise<PetImage[]> {
    const catApiImagesUrl = `${this._catApiBaseUrl}/images/search?limit=10`;
    // OBS: fetch simples sem tratamento de erro.
    const petImgs: PetImage[] = await (await fetch(catApiImagesUrl)).json();
    return petImgs;
  }
}

export const catsApi = new CatsApiServiceImpl();
