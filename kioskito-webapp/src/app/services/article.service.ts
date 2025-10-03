import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  // private apiUrl = 'https://localhost:7015/api/articles';
  private apiUrl = 'http://localhost:3000/articles';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  getById(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  create(article: Partial<Article>): Observable<string> {
    return this.http.post<string>(this.apiUrl, article);
  }

  update(id: string, article: Article): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, article);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


// json-server --watch db.json --port 3000
