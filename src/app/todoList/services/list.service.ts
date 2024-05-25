import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TodoTask } from '../interface/list.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http   =  inject( HttpClient );
  private url    = 'http://localhost:3001';
	private Ws     = 'task'; ;
  private data   =  signal<Task[]>([]); //señal para manejar el estado de la lista de tarea

  getPTask(): Observable<TodoTask> {
    return this.http.get<TodoTask>(`${this.url}/${this.Ws}`);
  }

  addTask(item: any) {
    return this.http.post(`${this.url}/${this.Ws}`,item);
   }

   updateTask(item: any) {
    return this.http.put(`${this.url}/${this.Ws}/${item._id}`,item);
   }

   deleteTask(item: any) {
    return this.http.delete(`${this.url}/${this.Ws}/${item._id}`);
   }

   dispatchSignal() {
    this.getPTask().subscribe(response => {
        this.data.set(response.items);  // Actualiza la señal con los datos de la API
    }
    );
  }

  getDataSignal() {
    return this.data;
  }
}
