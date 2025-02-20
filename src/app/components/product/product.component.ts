import { Component, EventEmitter, Input, Output, ViewChild, viewChild } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule} from 'primeng/confirmpopup'

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RatingModule,
    FormsModule,
    ButtonModule,
    ConfirmPopupModule
  ],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  constructor(private confirmationService: ConfirmationService){

  }

  @ViewChild('deleteButton') deleteButton: any;
  @Input() product!: Product;
  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();
  
  editProduct(){
    this.edit.emit(this.product);
  }

  confirmDelete(){
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: 'Are you sure that you want ot delete this product?',
      accept: () => {
        this.deleteProduct();
      },
    });
  }

  deleteProduct(){
    this.delete.emit(this.product);
  }
  ngOnInit(){
    //this.productOutput.emit(this.product);
    console.log(this.edit);
  }
}
