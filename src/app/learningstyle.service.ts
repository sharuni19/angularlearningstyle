import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LearningstyleService {
  englishcurrentLevel: any;
  englishlearningType: any;
  computerscienecurrentLevel: any;
  computersciencelearningType: any;
  constructor(public http: HttpClient) { }

  loginUser(email: any, password: any) {
    return this.http.get(environment.learningstyleservice + '/loginUser/' + email + '/' + password);
  }
  registerUser(formData: any) {
    return this.http.post(environment.learningstyleservice + '/registerUser', formData);
  }
  getAllSubjectLevelCollections() {
    return this.http.get(environment.learningstyleservice + '/getAllSubjectLevelCollections');
  }
  getUserCompletedLevel(email: any) {
    return this.http.get(environment.learningstyleservice + '/getUserCompletedLevel/' + email);
  }
  submitFeedback(email: any, feedback: any) {
    return this.http.get(environment.learningstyleservice + '/submitFeedback/' + email + '/' + feedback);
  }
  getUser(email: any) {
    return this.http.get(environment.learningstyleservice + '/getUser/' + email);
  }
  getRankAndPoints(email: any, subject: any) {
    return this.http.get(environment.learningstyleservice + '/getRankAndPoints/' + email + '/' + subject);
  }
  predictUser(responses: any) {
    return this.http.post(environment.predictuserservice + '/predctLearningStyle', responses);
  }
  updateUserCompletedLevel(email: any, subject: any) {
    return this.http.get(environment.learningstyleservice + '/updateUserCompletedLevel/' + email + '/' + subject)
  }
  updateUserLearningType(email: any, subject: any, learningType: any) {
    return this.http.get(environment.learningstyleservice + '/updateUserLearningType/' + email + '/' + subject + '/' + learningType)
  }
  updateLeaderBoardPoints(email: any, subject: any, points: any) {
    return this.http.get(environment.learningstyleservice + '/updateLeaderBoardPoints/' + email + '/' + subject + '/' + points)
  }
}
