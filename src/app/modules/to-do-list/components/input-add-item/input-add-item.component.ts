import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, ViewChild, inject, Input } from '@angular/core';
import { IListItems } from '../../interface/IListItems.iterface';
import { JsonPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [JsonPipe, NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {

  //fazer injesao
  #cdr = inject(ChangeDetectorRef)

  //decorar o elemento domm
  @ViewChild("inputText") public inputText!: ElementRef;

  @Input({ required: true }) public inputListItems : IListItems[] = []
  @Output() public outpuAddListaItem = new EventEmitter<IListItems>()

  public focusandAddItem(value: string){
    if(value) {
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = '';

      const dataautal = new Date();
      const timeStamp = dataautal.getTime();
      const id = `ID ${timeStamp}`

      this.outpuAddListaItem.emit({
        id,
        checked: false,
        value
      })

      // console.log(value)
            
      return this.inputText.nativeElement.focus()
    }
  }
}
