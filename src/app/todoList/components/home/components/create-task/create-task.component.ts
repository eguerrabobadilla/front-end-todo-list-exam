import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalController, IonicModule } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { Task } from 'src/app/todoList/interface/list.interface';
import { ApiService } from 'src/app/todoList/services/list.service';
import { ionicStandaloneImports } from 'src/app/ionic-imports';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...ionicStandaloneImports],
  providers: []
})
export class CreateTaskComponent  implements OnInit {

  @Input() task!        : Task;
  @Input() isEditing    : boolean = false;

  private modalCtrl     = inject( ModalController );
  private formBuilder   = inject( FormBuilder );
  private taskService   = inject( ApiService );

  public frmLogin!      : FormGroup;


  ngOnInit() {
    this.initializeForm();
    if(this.isEditing) this.frmLogin.setValue(this.task); //si esta editando
  }

  private initializeForm() {

    this.frmLogin = this.formBuilder.group({
                    _id:           [''],
                    title:         ['', [Validators.required]],
                    description:   ['', [Validators.required]],
                    isCompleted:   [{value: false, disabled: !this.isEditing }, [Validators.required]],
                    createdAt:     [''],
                    updatedAt:     ['']
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {

    if (this.frmLogin.invalid) {
        this.frmLogin.markAllAsTouched();
        return;
    }
    const {_id, title , description, isCompleted}:Task = this.frmLogin.value;
    const taskObservable = this.isEditing ? this.taskService.updateTask({_id ,title , description, isCompleted})
                                          : this.taskService.addTask({title , description, isCompleted:false});

    taskObservable.subscribe(() => {
      this.taskService.dispatchSignal();
      this.modalCtrl.dismiss();
    });
  }

  isInvalidField(field: string) {
    const control = this.frmLogin.get(field);
    return control!.touched && control!.invalid;
  }

}

