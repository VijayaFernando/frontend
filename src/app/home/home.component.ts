import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AdalService } from "adal-angular4";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { HomeService } from "./home.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  user: any;
  profile: any;
  dataSource = [];
  displayedColumns: string[] = ["id", "name"];
  @ViewChild("fileUpload") fileUpload: ElementRef;
  files = [];
  isLoading: boolean = true;

  constructor(
    private adalService: AdalService,
    protected http: HttpClient,
    protected homeService: HomeService
  ) {}

  ngOnInit() {
    this.user = this.adalService.userInfo;

    this.user.token = this.user.token.substring(0, 10) + "...";
    this.getUserInfo().subscribe({
      next: (result) => {
        this.dataSource = result["data"];
        console.log(this.dataSource);
      },
    });
  }

  getUserInfo() {
    return this.http.get("https://vijayafrontdoor.azurefd.net/users");
  }

  public getProfile() {
    console.log("Get Profile called");
    return this.http.get("https://graph.microsoft.com/v1.0/me");
  }

  public profileClicked() {
    this.getProfile().subscribe({
      next: (result) => {
        console.log("Profile Response Received");
        this.profile = result;
      },
    });
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append("image", file.data);
    // this.isLoading = true;
    this.homeService.upload(formData).subscribe({
      next: (result) => {
        if (result["statusCode"] == 200) {
          console.log("Upload Successfull");
        } else {
          console.log("Upload Fail");
        }
      },
    });
  }
  private uploadFiles() {
    this.fileUpload.nativeElement.value = "";
    this.uploadFile(this.files[0]);
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }
}
