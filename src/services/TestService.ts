import apiService from "./api";
import { Observable } from "rxjs";

class TestService {
  getMethodTest = (id: number): Observable<any> => {
    return apiService.get(`/get/${id}`);
  };

  postMethodTest = (): Observable<any> => {
    return apiService.post("/post", { message: "body request post" });
  };

  deleteMethodTest = (id: number): Observable<any> => {
    return apiService.delete(`/delete/${id}`);
  };

  putMethodTest = (id: number): Observable<any> => {
    return apiService.put(`/put/${id}`, { message: "body request put" });
  };
}

const testService = new TestService();
export default testService;
