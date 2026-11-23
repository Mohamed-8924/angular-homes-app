import { Component, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HousingService } from "../housing-service";
import { HousingLocationInfo } from "../housinglocation";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";

@Component({
  imports: [ReactiveFormsModule],
  selector: "app-details",
  styleUrl: "./details.css",
  templateUrl: "./details.html",
})
export class Details {
  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    const id = Number(this.route.snapshot.params["id"]);
    this.housingService.getHouseById(id).then((houseId) => {
      this.housingLocation = houseId;
      this.changeDetectorRef.markForCheck();
    });
  }

  form = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });

  submitApplication() {
    this.housingService.submitApplication(
      this.form.value.firstName ?? "",
      this.form.value.lastName ?? "",
      this.form.value.email ?? "",
    );
  }

  housingLocation: HousingLocationInfo | undefined;
}
