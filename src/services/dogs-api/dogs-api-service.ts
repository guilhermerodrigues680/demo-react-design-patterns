import { PetImage } from "../../models/pet-image.type";
import { ApiService } from "../interfaces/api-service.type";

export class DogsApiServiceImpl implements ApiService {
  // https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=8FfZAkNzs
  private readonly _dogApiBaseUrl = "https://api.thedogapi.com/v1";

  constructor() {}

  public async getPets(): Promise<PetImage[]> {
    const dogApiImagesUrl = `${this._dogApiBaseUrl}/images/search?limit=10`;
    // OBS: fetch simples sem tratamento de erro.
    const petImgs: PetImage[] = await (await fetch(dogApiImagesUrl)).json();
    return petImgs;
  }
}

export const dogsApi = new DogsApiServiceImpl();
