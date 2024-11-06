import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  searchQuery: string = '';
  sortOption: string = '';
  selectedEmployee: Item | null = null;
  showPopup: boolean = false;

  constructor(private itemService: ItemService) {}
  private APP_VERSION = '1.0'; // Increment this when data structure changes

  ngOnInit(): void {
    this.checkForDataReset();

    this.itemService.getAllItem().subscribe((data) => {
      this.items = data;
      this.filteredItems = this.items; 
      this.saveData();
    });
  }
  openEmployeeDetails(employee: Item): void {
    console.log("Opening popup for employee:", employee);
    this.selectedEmployee = employee;
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
    this.selectedEmployee = null;
  }

  checkForDataReset() {
    const storedVersion = localStorage.getItem('appVersion');
    if (storedVersion !== this.APP_VERSION) {
      localStorage.clear();
      localStorage.setItem('appVersion', this.APP_VERSION);
    }
  }

  loadData() {
    const storedData = localStorage.getItem('employees');
    if (storedData) {
      this.items = JSON.parse(storedData);
    } else {
      this.itemService.getAllItem().subscribe((data) => {
        this.items = data;
        this.saveData();
      });
    }
    this.filteredItems = this.items;
  }

  saveData() {
    localStorage.setItem('employees', JSON.stringify(this.items));
  }

  resetData() {
    localStorage.removeItem('employees');
    location.reload();
  }

  delete(id: Number) {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      this.itemService.delete(id).subscribe((data) => {
        this.items = this.items.filter(itm => itm.id != id);
        this.filteredItems = this.items;
        this.saveData();
      });
    }
  }

  search() {
    this.filteredItems = this.items.filter(item =>
      item.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  sort() {
    if (this.sortOption === 'name') {
      this.filteredItems.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (this.sortOption === 'department') {
      this.filteredItems.sort((a, b) => a.department.localeCompare(b.department));
    }
  }
}
