import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PromotionCode} from "../model/promotionCode";
import {Url} from "../model/url";

const base_url = Url.urlBackend + '/promotionCode';

@Injectable({
  providedIn: 'root'
})
export class PromotionCodeService {
  constructor(private http: HttpClient) { }

  getPromotionCodeByCode(code: string) {
    return this.http.get<PromotionCode>(base_url + `/getPromotion/${code}`, { withCredentials: true });
  }
}
