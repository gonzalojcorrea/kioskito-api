import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from '../models/article.model';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = `${environment.apiUrl}/articles`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Article[]> {
    return this.http.get<ApiResponse<Article[]>>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  getById(id: string): Observable<Article> {
    return this.http.get<ApiResponse<Article>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  create(article: Partial<Article>): Observable<string> {
    return this.http.post<ApiResponse<string>>(this.apiUrl, article).pipe(
      map(response => response.data)
    );
  }

  update(id: string, article: Article): Observable<void> {
    return this.http.put<ApiResponse<void>>(`${this.apiUrl}/${id}`, article).pipe(
      map(response => response.data)
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }
}


// json-server --watch db.json --port 3000
