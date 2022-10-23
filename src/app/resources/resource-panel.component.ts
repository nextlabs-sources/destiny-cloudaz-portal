import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import docResources from "../../assets/json/resources.json";

@Component({
  selector: "resource-panel",
  templateUrl: "resource-panel.html",
  styleUrls: ["resource-panel.scss"],
})
export class ResourcePanelComponent implements OnInit {
  white_paper_list;
  webinar_list;
  datasheet_list;

  list = [];
  showDialog = false;
  iframeSrc: SafeResourceUrl;

  videoBackgroundImage = "/assets/img/cloudaz/video2_bg.svg";

  videoTitle = "CloudAz Product Demo Videos";
  videoDescription =
    "These videos detail how to enforce security policies with CloudAz";

  images: string[] = [
    "/assets/img/cloudaz/video1_bg.svg",
    "/assets/img/cloudaz/video2_bg.svg",
  ];

  constructor(
    private _route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.white_paper_list = docResources.whitePapers.list;
    this.updateDocDetail(this.white_paper_list);

    this.datasheet_list = docResources.datasheets.list;
    this.updateDocDetail(this.datasheet_list);
  }

  private updateDocDetail(list: any[]): void {
    list.forEach((val) => {
      if (val.iframeSrc) {
        const youtube_video_id = val.iframeSrc
          .match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/)
          .pop();
        val.thumbnail = this._sanitizer.bypassSecurityTrustStyle(
          `url(//img.youtube.com/vi/${youtube_video_id}/0.jpg)`
        );
      }
      const ran = Math.floor(Math.random() * 2);
      val.backgroundImage = this._sanitizer.bypassSecurityTrustStyle(
        `url(${this.images[ran]})`
      );
    });
  }

  openDialog(item: { iframeSrc: string }): void {
    console.log(this.showDialog);
    this.iframeSrc = this._sanitizer.bypassSecurityTrustResourceUrl(
      item.iframeSrc
    );

    this.showDialog = true; //"is-active";
  }

  closeDialog(): void {
    this.showDialog = false;
  }

  dialogCss(): string {
    return this.showDialog ? "modal is-active" : "modal";
  }

  openLink(item: { link: string }): void {
    window.open(item.link, "_blank");
  }

  openVideo(): void {
    console.log("Open Video");
  }
}
