import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../models/product.model";
import {Observable} from "rxjs";

const STORE_BASE_URL = "https://fakestoreapi.com";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts(limit='10', sort='desc', category?: string): Observable<Product[]> {

    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('sort', sort);

    return this.httpClient.get<Product[]>(`${STORE_BASE_URL}/products${category ? '/category/' + category : ''}`, { params });
  }

  getAllCategories():Observable<string[]> {
    return this.httpClient.get<string[]>(`${STORE_BASE_URL}/products/categories`);
  }
}
