import { Service } from "@angular/core";
import { HousingLocationInfo } from "./housinglocation";

@Service()
export class HousingService {
  submitApplication(first: string, last: string, email: string) {
    console.log(
      `Home received: firstName: ${first}, lastName: ${last}, email: ${email}`,
    );
  }

  url = "http://localhost:3000/locations";

  async getAllHousing(): Promise<HousingLocationInfo[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
  async getHouseById(id: number): Promise<HousingLocationInfo | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    const locationJson = await data.json();
    return locationJson ?? {};
  }
}
