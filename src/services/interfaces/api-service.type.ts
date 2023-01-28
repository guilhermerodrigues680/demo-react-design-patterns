import { PetImage } from "../../models/pet-image.type";

export interface ApiService {
  getPets(): Promise<PetImage[]>;
}
