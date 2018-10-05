import { Component, NgZone, Inject } from "@angular/core"
import { AlertController, NavController, LoadingController, ToastController, ActionSheetController, Platform, ModalController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { ModalPage } from './../modal/modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  todoItems: object[];
  constructor(
    public navCtrl: NavController,
    public http: HTTP,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public actionSheetCtrl: ActionSheetController,
    private _ngZone: NgZone,
    public modalCtrl: ModalController
  ) { this.getTodoItems();}

  getTodoItems() {
    this.http.get('<ServiceURL>/getTodoItems', {}, {})
      .then(data => {
        this._ngZone.run(() => {
          this.todoItems = JSON.parse(data.data);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  openTodo($event, todoItem) {
    // this.navCtrl.push(TodoItemPage, {
    //   item: todoItem
    // });
    let actionSheet = this.actionSheetCtrl.create({
      title: todoItem.title,
      subTitle: todoItem.description,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  updateItemStatus(todoItem) {
    if (todoItem.IsCompleted == "Y") todoItem.IsCompleted = "N";
    else if (todoItem.IsCompleted == "N") todoItem.IsCompleted = "Y";
    this.http.post('<ServiceURL>/updateTodoItem', todoItem, {})
      .then(data => {
        console.log(data);
        this.toastCtrl.create({
          message: "To-do list has been updated !!",
          duration: 3000,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'Ok'
        }).present();
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteTodoItem(todoItem) {
    this.http.post('<ServiceURL>/deleteTodoItem', todoItem, {})
      .then(data => {
        console.log(data);
        this.toastCtrl.create({
          message: "The item \"" + todoItem.title + "\" has been removed",
          duration: 1500,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'Ok'
        })
      })
      .catch(error => {
        console.log(error);
      });
    this.getTodoItems();
  }

  promptDeleteDialog(todo) {
    const confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Are you sure deleting this todo would do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteTodoItem(todo);
          }
        }
      ]
    });
    confirm.present();
  }

  showAddTodoDialog() {
    let promptBox = this.alertCtrl.create({
      title: 'Add todo',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'description',
          placeholder: 'Description'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            //this.addTodoItem(data);
          }
        }
      ]
    });
    promptBox.present();
  }

  openAddTodoPage() {
    let modal = this.modalCtrl.create(ModalPage);
    modal.onDidDismiss(()=>{
      this.getTodoItems();
    });
    modal.present();
  }
}
