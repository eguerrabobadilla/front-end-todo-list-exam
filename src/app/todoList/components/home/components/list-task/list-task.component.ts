import { CommonModule } from '@angular/common';
import { Component, OnInit, SimpleChanges, effect, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CardTaskComponent } from '../card-task/card-task.component';
import { ApiService } from 'src/app/todoList/services/list.service';

@Component({
  selector: 'list-task-component',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss'],
  standalone: true,
  imports: [IonicModule , CommonModule, CardTaskComponent],
})
export class ListTaskComponent  implements OnInit {

  private apiService = inject(ApiService);
  data$              = this.apiService.getDataSignal(); //señal utilizada en el html

  ngOnInit() {
        this.apiService.dispatchSignal();
  }


}
