import * as Rx from "rxjs";
import axios, { Method, AxiosResponse } from "axios";
import { API_URL } from "../settings";
import { map } from "rxjs/operators";

export class ApiService {
  constructor(private apiEndpoint: string) {}

  public get(url: string): Rx.Observable<any> {
    return this.request("GET", url).pipe(
      map((response: AxiosResponse) => response.data)
    );
  }

  public post(url: string, body: any): Rx.Observable<any> {
    return this.request("POST", url, body).pipe(
      map((response: AxiosResponse) => response.data)
    );
  }

  public put(url: string, body: any): Rx.Observable<any> {
    return this.request("PUT", url, body).pipe(
      map((response: AxiosResponse) => response.data)
    );
  }

  public delete(url: string): Rx.Observable<any> {
    return this.request("DELETE", url).pipe(
      map((response: AxiosResponse) => response.data)
    );
  }

  private request<T = any>(method: Method, url: string, data: any = null): any {
    const headers = {};
    return Rx.from(
      axios.request({
        baseURL: this.apiEndpoint,
        url,
        method,
        headers,
        data: method === "POST" || method === "PUT" ? data : null
      })
    );
  }
}

const apiService = new ApiService(API_URL);

export default apiService;
