import { CommonModule } from '@angular/common';
import { Component, OnInit, SimpleChanges, effect, inject } from '@angular/core';
import { CardTaskComponent } from '../card-task/card-task.component';
import { ApiService } from 'src/app/todoList/services/list.service';
import { ionicStandaloneImports } from 'src/app/ionic-imports';
import { IonList } from "@ionic/angular/standalone";

@Component({
  selector: 'list-task-component',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss'],
  standalone: true,
  imports: [ ...ionicStandaloneImports , CommonModule, CardTaskComponent],
})
export class ListTaskComponent  implements OnInit {

  private apiService = inject(ApiService);
  data$              = this.apiService.getDataSignal(); //señal utilizada en el html

  ngOnInit() {
        this.apiService.dispatchSignal();
  }


}
