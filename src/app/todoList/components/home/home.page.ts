import { Component, OnInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListTaskComponent } from './components/list-task/list-task.component';
import { IonicModule, ModalController  } from '@ionic/angular';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { add } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ApiService } from '../../services/list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, ListTaskComponent, CreateTaskComponent, CommonModule]
})
export class HomePage implements OnInit {

  private modalCtrl = inject(ModalController);
  private taskService = inject(ApiService);
  data$ = this.taskService.getDataSignal();

  public noTask!: boolean;


  constructor() {
    addIcons({ add }); //añadir icono ya que utilizamos standalone
    effect(() => {
      this.noTask = this.data$().length === 0;
    });
  }

  ngOnInit() {
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CreateTaskComponent,
    });
    modal.present();
  }

}
