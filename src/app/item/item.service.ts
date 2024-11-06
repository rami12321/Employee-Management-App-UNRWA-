import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private _httpClient: HttpClient) { }
  getAllItem(){
    return this._httpClient.get<Item[]>(`http://localhost:3000/items?timestamp=${new Date().getTime()}`);
  }
  

  create(data:Item){
    return this._httpClient.post<Item>("http://localhost:3000/items", data);
  }
  getById(id: number) {
    return this._httpClient.get<Item>(`http://localhost:3000/items/${id}`);
  }
  
  updateItem(data: Item) {
    return this._httpClient.put<Item>(`http://localhost:3000/items/${data.id}`, data);
  }
  delete(id:Number){
    return this._httpClient.delete<Item>(`http://localhost:3000/items/${id}`);
  }
}
