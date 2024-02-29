import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { IListItems } from '../../interface/IListItems.iterface';
import { JsonPipe } from '@angular/common';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';
import { Elocalstoragem } from '../../enum/Elocalstoragem.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addItem = signal(true);

  #setlistItems = signal<IListItems[]>(this.#parseItems());
  public getlistItems = this.#setlistItems.asReadonly();

  #parseItems(){
    return JSON.parse(localStorage.getItem(Elocalstoragem.MY_LIST) || '[]')
  }

  #UpdateLocalStorage(){
    return localStorage.setItem(
      Elocalstoragem.MY_LIST, 
      JSON.stringify(this.#setlistItems()))
  }

  //INSERIR NO LOCAL STORAGE
  public getInputandAddItem(value: IListItems){
    localStorage.setItem(Elocalstoragem.MY_LIST, JSON.stringify([...this.#setlistItems(), value]));

    return this.#setlistItems.set(this.#parseItems())
  }

  //VERIFICAR SE TA COM TRUE OU FALSE 
   public listItemsStage( valor: 'pending' | 'completed'){

    return this.getlistItems().filter((res: IListItems) =>{

      if(valor == 'pending'){
        return !res.checked
      }
      else if(valor == 'completed'){
        return res.checked
      }

      return res;

    })
  }

  //UPDATE DE CAIXINHA NO LOCAL STORAGE
  public updateitemcheckbox(newitem: {id: string; checked: boolean}){
    this.#setlistItems.update((oldvalue: IListItems[]) => {
      oldvalue.filter((res) => {
        if(res.id === newitem.id){
          res.checked = newitem.checked;
          return res;
        }

        return res;
      })
      return oldvalue;
    });

    return this.#UpdateLocalStorage();
  }

  //UPDATE DE TEXTO NO LOCAL STORAGE
  public updatetext(newItem: { id: string; value: string}){
    this.#setlistItems.update((oldvalue: IListItems[]) => {
      oldvalue.filter((res) => {
        if(res.id === newItem.id){
          res.value = newItem.value;
          return res;
        }

        return res;
      })
      return oldvalue;
    });

    return this.#UpdateLocalStorage();
  }

  //DELETAR ITEM LOCAL STORAGE
  public deletItemtext(newItem: {id: string; value: string}){

    Swal.fire({
      title: "Tem certeza?",
      text: `Você irar deletar a tarefa "${newItem.value}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, Deletar!"
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire({
          title: "Sucesso!",
          text: "Item deletado com sucesso",
          icon: "success"
        });

        //DELETAR
    this.#setlistItems.update((oldvalue: IListItems[]) => {
      
      return oldvalue.filter((res) => res.id !== newItem.id);
    })
    }
    });


    return this.#UpdateLocalStorage();
  }

  //deletar tudo
  public deletaralltems(){


    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderar reverter!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, Deletar tudo!"
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire({
          title: "Sucesso!",
          text: "Item deletado com sucesso",
          icon: "success"
        });

        //DELETAR TUDO
        localStorage.removeItem(Elocalstoragem.MY_LIST)
        return this.#setlistItems.set(this.#parseItems())
      }
    });

  }

  
}
