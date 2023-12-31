import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  categoryTypeList = ['books', 'clothing', 'electronics'];
  displayProductList: any = [];
  filterType = null;
  searchText: string = '';
  searchTextSub = new Subject<string>();

  productList : any = [
    {
      name: "Harry Potter",
      categoryType: "books",
      imagePath: "../../../assets/product-image/harry-potter.jpg",
      price: "$95"
    },
    {
      name: "Rich Dad Poor Dad",
      categoryType: "books",
      imagePath: "../../../assets/product-image/rich-dad-poor-dad.png",
      price: "$95"
    },
    {
      name: "Casual Shirt",
      categoryType: "clothing",
      imagePath: "../../../assets/product-image/casual-shirt.jpg",
      price: "$95"
    },
    {
      name: "Formal Shirt",
      categoryType: "clothing",
      imagePath: "../../../assets/product-image/formal-shirt.jpg",
      price: "$95"
    },
    {
      name: "T-Shirt",
      categoryType: "clothing",
      imagePath: "../../../assets/product-image/t-shirt.jpg",
      price: "$95"
    },
    {
      name: "IPhone 6S",
      categoryType: "electronics",
      imagePath: "../../../assets/product-image/apple-iphone-6s.jpg",
      price: "$95"
    },
    {
      name: "Nokia 6300",
      categoryType: "electronics",
      imagePath: "../../../assets/product-image/nokia-6300.jpg",
      price: "$95"
    }
  ]
  constructor() { }

  ngOnInit(): void {
    console.log("Product screen");
    this.displayProductList = [...this.productList];

    this.searchTextSub.pipe(debounceTime(1000)).subscribe(search => {
      console.log("search Text", search);
      this.searchText = search;
      if(this.searchText.length > 0){
        if(this.filterType !== 'all'){
          let updatedList =this.filterMethod();
          this.searchResult([...updatedList]);
        } else {
          this.searchResult([...this.productList]);
        }
      } else {
        if(this.filterType !== 'all'){
          let updatedList =this.filterMethod();
          this.displayProductList = [...updatedList];
        } else {
          this.displayProductList = [...this.productList];
        } 
      }
    });
  }

  onSelected(selectedCategory: any){
    console.log("selectedCategory", selectedCategory);   
    this.filterType = selectedCategory;
    if(selectedCategory !== 'all'){     
      if(this.searchText.length > 0){
        let updatedList =this.filterMethod();
        this.searchResult([...updatedList]);
      } else {
        this.displayProductList = this.filterMethod();
      }
    } else {
      if(this.searchText.length > 0){
        this.searchResult([...this.productList]);
      } else {
        this.displayProductList = [...this.productList];
      }   
    }
  }

  filterMethod(){
    let updatedList = this.productList.filter((product: any) => {
      return product.categoryType == this.filterType
    })
    return updatedList;
  }

  searchTextChanged(e: any) {
    console.log(e.target.value);
    this.searchTextSub.next(e.target.value);
  }

  searchResult(updatedList: any){
    this.displayProductList = updatedList.filter((product: any) => {
      return product.name.toLowerCase().includes(this.searchText.toLowerCase());
    });
    console.log("this.displayProductList", this.displayProductList);
  }
}
