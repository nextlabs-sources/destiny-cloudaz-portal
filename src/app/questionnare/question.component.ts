import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { formatDate } from "@angular/common";

import { ApiService } from "../services/api.service";
import { Answer } from "../models/answer";
import { CacheService } from "../services/cache_service";
import { GoogleAnalyticsService } from "../services/google-analytics.service";

@Component({
  selector: "question-panel",
  templateUrl: "question.html",
  styleUrls: ["question.scss"],
})
export class QuestionComponent implements OnInit {
  emailHash: string;

  public questionForm: FormGroup;
  public isSuccess = false;
  public isError = false;

  public validation_messages = {
    answer1: [
      { type: "required", message: "Your answer is required" },
      {
        type: "maxlength",
        message: "Your answer cannot be more than 3000 characters long",
      },
    ],
    answer2: [
      { type: "required", message: "Your answer required" },
      {
        type: "maxlength",
        message: "Your answer cannot be more than 3000 characters long",
      },
    ],
    answer3: [
      { type: "required", message: "Your answer is required" },
      {
        type: "maxlength",
        message: "Your answer cannot be more than 3000 characters long",
      },
    ],
    answer4: [
      { type: "required", message: "Your answer is required" },
      {
        type: "maxlength",
        message: "Your answer cannot be more than 3000 characters long",
      },
    ],
  };

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private cache: CacheService,
    private gtagService: GoogleAnalyticsService
  ) {
    this.cache.isVisibleMenu = false;
  }

  ngOnInit(): void {
    this.emailHash = this.route.snapshot.queryParamMap.get("emailHash");

    this.questionForm = new FormGroup({
      answer1: new FormControl("", [
        Validators.required,
        Validators.maxLength(3000),
      ]),
      answer2: new FormControl("", [
        Validators.required,
        Validators.maxLength(3000),
      ]),
      answer3: new FormControl("", [
        Validators.required,
        Validators.maxLength(3000),
      ]),
      answer4: new FormControl("", [
        Validators.required,
        Validators.maxLength(3000),
      ]),
    });
  }

  ngOnDestroy(): void {
    this.cache.isVisibleMenu = true;
  }

  public send = (questionFormValue) => {
    if (this.questionForm.invalid) {
      this.answer1.markAsDirty;
      //console.log("Form has error");
      this.isError = true;
      return;
    }

    //console.log("Anwers", questionFormValue);

    const now: Date = new Date();
    //let dateInSec:number = now.getTime() / 1000 ;
    //params = params.append("registerDate", "" + dateInSec.toFixed());
    const currentDate = formatDate(now, "yyy-MM-dd", "en-US");

    const answer: Answer = new Answer();
    answer.whatApp = questionFormValue["answer1"];
    answer.whatLanguage = questionFormValue["answer2"];
    answer.anythingElse = questionFormValue["answer3"];
    answer.introducer = questionFormValue["answer4"];
    answer.emailHash = this.emailHash;
    answer.registerDate = currentDate;

    this.isSuccess = false;
    this.isError = false;

    this.gtagService.eventEmitter(
      "Answer",
      "Questionaire",
      "Questionaire: Business Applications"
    );

    this.apiService.submitAnswer(answer).subscribe(
      (val) => {
        //console.log("Send answers success: ", val);
        this.isSuccess = true;
        window.scrollTo(0, 20);
      },
      (res) => {
        console.log("Send answers error: ", res);
        this.isError = true;
        window.scrollTo(0, 20);
      }
    );
  };

  get answer1(): AbstractControl {
    return this.questionForm.get("answer1");
  }

  get answer2(): AbstractControl {
    return this.questionForm.get("answer2");
  }

  get answer3(): AbstractControl {
    return this.questionForm.get("answer3");
  }

  get answer4(): AbstractControl {
    return this.questionForm.get("answer4");
  }
}
