import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListItems } from '../../interface/IListItems.iterface';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss'
})
export class InputListItemComponent {

  @Input({ required: true }) public inputListItems : IListItems[] = [];

  //MARCAR CAIXINHA
  @Output() public outputupdateitemcheckbox = new EventEmitter<{ 
    id: string,
    checked: boolean; 
  }>();

  public updateItemCheckbox( id: string, checked: boolean){
    return this.outputupdateitemcheckbox.emit({id, checked})
  }

//EDITAR TEXTO
  @Output() public outputupdateitemTexto = new EventEmitter<{ 
    id: string,
    value: string; 
  }>();

  public updateItemTexto( id: string, value: string){
    return this.outputupdateitemTexto.emit({id, value})
  }


//deletar texto
@Output() public outputdeletItem = new EventEmitter<{ 
  id: string,
  value: string; 
}>();

public deleteItem( id: string, value: string){
  return this.outputdeletItem.emit({id, value})
}


}
