import { Component } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  item: Item={
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: '',
    performanceRating: 0
  }

  constructor(private itemService:ItemService, private router: Router){}
 
  hoverRating = 0;

  setRating(rating: number) {
    this.item.performanceRating = rating;
  }

  // Function to add a new item to local storage
  addToLocalStorage(newItem: Item) {
    const items = JSON.parse(localStorage.getItem('employees') || '[]');
    items.push(newItem); // Add the new item to the array
    localStorage.setItem('employees', JSON.stringify(items)); // Save the updated list back to local storage
  }
  
  create() {
    this.itemService.create(this.item).subscribe({
      next: (data: Item) => {
        this.addToLocalStorage(data); // Add the new item to local storage
        this.router.navigate(["/item/home"]); // Navigate after adding
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  cancel(){
    this.router.navigate(['item/home'])
  }


}
