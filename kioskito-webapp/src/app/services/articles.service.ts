import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  private data: Article[] = [
    { codigo: 1001, nombre: 'Coca Cola 500ml', categoria: 'Bebidas', precio: 450, activo: true, fechaAlta: new Date().toISOString() },
    { codigo: 1002, nombre: 'Papas Lays 100g',   categoria: 'Snacks',  precio: 320, activo: true, fechaAlta: new Date().toISOString() },
  ];

  getAll(): Article[] { return [...this.data]; }
  add(a: Article) { this.data = [...this.data, a]; }
  update(codigo: number, patch: Partial<Article>) {
    this.data = this.data.map(x => x.codigo === codigo ? { ...x, ...patch } : x);
  }
  remove(codigo: number) {
    this.data = this.data.filter(x => x.codigo !== codigo);
  }
}