import { Component, Injectable } from '@angular/core';
import { NavParams, ViewController, ToastController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})

export class ModalPage {
  title: ""
  description: ""
  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public http: HTTP
  ) { }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  addTodoItem() {
    var todo = { title: "", description: "" };
    todo.title = this.title;
    todo.description = this.description;
    this.http.post('<ServiceURL>/addTodoItems', todo, {})
      .then(data => {
        this.toastCtrl.create({
          message: "Todo status " + data.data,
          duration: 3000,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'Ok'
        }).present();
      })
      .catch(error => {
        console.log(error);
      });
    this.viewCtrl.dismiss();
  }
}