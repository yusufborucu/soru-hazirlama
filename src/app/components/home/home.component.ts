import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  questionForm: FormGroup;
  questions = [];
  letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'Y', 'Z'];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      schoolName: '',
      lessonName: '',
      examName: '',
      classBranch: '',
      academicYear: '',
    });
    this.questionFormReset();
  }

  questionFormReset() {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      questionTop: '',
      answerModel: ['0', Validators.required],
      fontSize: [9, [Validators.min(6), Validators.max(15)]],
      column: [2, [Validators.min(1), Validators.max(2)]],
      answers: this.fb.array([])
    });
  }

  addQuestion() {
    this.questions.push(this.questionForm.value);
    this.questionFormReset();
    console.log(this.questions);
  }

  createAnswer() {
    return this.fb.group({
      answer: ''
    });
  }

  get questionFormItemsArray(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  addAnswer() {
    this.questionFormItemsArray.push(this.createAnswer());
  }

  removeAnswer(index) {
    this.questionFormItemsArray.removeAt(index);
  }

  removeQuestion(question) {
    this.questions.splice(this.questions.indexOf(question), 1);
  }

}
