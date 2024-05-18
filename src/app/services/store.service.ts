import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../models/product.model";

const STORE_BASE_URL = "https://fakestoreapi.com";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts(limit='10', sort='desc') {

    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('sort', sort);

    return this.httpClient.get<Product[]>(`${STORE_BASE_URL}/products`, { params });
  }
}
