import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  item: Item = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: '',
    performanceRating: 0,
  };

  constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getItemById(id);
    }
  }
  hoverRating = 0;

  setRating(rating: number) {
    this.item.performanceRating = rating;
  }

  getItemById(id: number) {
    this.itemService.getById(id).subscribe({
      next: (data) => {
        this.item = data;
       
      },
      error: (err) => {
        console.log("Error fetching item by ID:", err);
      }
    });
  }
  updateLocalStorage(updatedItem: Item) {
    const items = JSON.parse(localStorage.getItem('employees') || '[]');
    const index = items.findIndex((item: Item) => item.id === updatedItem.id);
    if (index !== -1) {
      items[index] = updatedItem; // Replace the old item with the updated one
      localStorage.setItem('employees', JSON.stringify(items)); // Save updated list back to local storage
    }
  }
  update() {
    this.itemService.updateItem(this.item).subscribe({
      next: () => {
        this.router.navigate(["/item/home"]);
        this.updateLocalStorage(this.item);

        

      },
      error: (err) => {
        console.log("Error updating item:", err);
      }
    });
  }

  cancel() {
    this.router.navigate(['/item/home']);
  }
}
