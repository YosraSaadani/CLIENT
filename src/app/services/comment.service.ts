import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../Entities/comment';
import { Observable } from 'rxjs';
const url = 'http://localhost:5000/api/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getCommentsByDoctorId(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(url + '/getByDoctorid/' + id);
  }

  addComment(body: any): Observable<Comment> {
   
    return this.http.post<Comment>(url + '/addcomment', body);
}
}
