import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, 
    CommonModule, 
    PaginatorModule, 
    EditPopupComponent, 
    FormsModule,
    ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private productsService: ProductsService
  ){ }

  products: Product[] =[];

  totalRecords: number = 0;
  rows: number = 5;
  first: number = 0;
  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  @ViewChild('paginator') paginator : Paginator | undefined;

  resetPaginator(){
    this.paginator?.changePage(0);
  }
onProductOutput(product:Product){
  console.log(product, 'output');
}

  onPageChange(event: any){
    this.fetchProducts(event.page, event.rows);
  }

  fetchProducts(page: number, perPage: number){
    this.productsService
    .getProducts('http://localhost:3000/clothes',{page, perPage})
    .subscribe({
      next: (data: Products) =>{
        this.products = data.items;
        this.totalRecords = data.total;
        this.resetPaginator();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editProduct(product: Product, id: number){
    this.productsService.editProduct('http://localhost:3000/clothes/${id}', product).subscribe(
      {
        next: (data) => {console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => console.log(error),
      }
    );
  }

  deleteProduct(id: number){
    this.productsService.deleteProduct('http://localhost:3000/clothes/${product.id}')
      .subscribe({
        next:(data) =>{
          console.log(data);
          this.fetchProducts(0,this.rows);
          this.resetPaginator();
        },
        error: (error) =>{
          console.log(error)
        }
      });
  }

  onConfirmAdd(product: Product){
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  toggleEditPopup(product: Product){
    this.selectedProduct = product;
    this.displayEditPopup =true;
  }

  toggleAddPopup(){
    this.displayAddPopup = true;
  }

  toggleDeletePopup(product: Product){

  }

selectedProduct: Product = {
  id: 0,
  name: '',
  image: '',
  price: '',
  rating: 0,
};

  onConfirmEdit(product: Product){
    this.editProduct(product, this.selectedProduct.id ?? 0);
    this.displayAddPopup = false;
  }

  addProduct(product: Product){
    this.productsService.addProduct('http://localhost:3000/clothes',product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0,this.rows);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  ngOnInit(){
    this.fetchProducts(this.first, this.rows);
  }
}
