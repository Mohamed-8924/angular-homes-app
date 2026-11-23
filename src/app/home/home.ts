import { Component, ChangeDetectorRef } from "@angular/core";
import { HousingLocation } from "../housing-location/housing-location";
import { HousingService } from "../housing-service";
import { HousingLocationInfo } from "../housinglocation";

@Component({
  imports: [HousingLocation],
  selector: "app-home",
  styleUrl: "./home.css",
  templateUrl: "./home.html",
})
export class Home {
  constructor(
    public housingService: HousingService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.housingService
      .getAllHousing()
      .then((houseList: HousingLocationInfo[]) => {
        this.housingLocationList = houseList;
        this.filteredLocationList = houseList;
        this.changeDetectorRef.markForCheck();
      });
  }

  housingLocationList: HousingLocationInfo[] = [];

  filteredLocationList: HousingLocationInfo[] = [];

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter((house) => {
      return house?.city.toLocaleLowerCase().includes(text.toLocaleLowerCase());
    });
  }
}
