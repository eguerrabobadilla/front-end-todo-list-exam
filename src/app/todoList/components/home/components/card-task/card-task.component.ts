import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { Task } from 'src/app/todoList/interface/list.interface';
import { trashOutline, checkmarkDoneCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ApiService } from 'src/app/todoList/services/list.service';
import { ionicStandaloneImports } from 'src/app/ionic-imports';

@Component({
  selector: 'card-task-component',
  templateUrl: './card-task.component.html',
  styleUrls: ['./card-task.component.scss'],
  standalone: true,
  imports: [...ionicStandaloneImports , CommonModule, CreateTaskComponent, ],
})
export class CardTaskComponent  implements OnInit {

  private modalCtrl     = inject( ModalController );
  private taskService   = inject( ApiService );

  public frmLogin!      : FormGroup;

  @Input() data!        : Task ;

  constructor() {
    addIcons({ trashOutline, checkmarkDoneCircleOutline });
   }

  ngOnInit() {}

  delete(event: Event , data:Task){
    event.stopPropagation();
    this.taskService.deleteTask(data).subscribe(() => {
      this.taskService.dispatchSignal();
    });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CreateTaskComponent,
      componentProps: { task: this.data , isEditing: true }
    });
    modal.present();

  }

}
