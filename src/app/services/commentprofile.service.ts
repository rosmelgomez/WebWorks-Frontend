import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CommentProfile} from "../model/commentProfile";
import {CommentProfileSummary} from "../modelComplement/commentProfileSummary";
import {Url} from "../model/url";

const base_url = Url.urlBackend + '/commentProfile';

@Injectable({
  providedIn: 'root'
})
export class CommentProfileService {
  constructor(private http: HttpClient) {}

  addComment(comment: CommentProfile) {
    return this.http.post<number>(base_url + '/addComment', comment, { withCredentials: true });
  }

  getComment(idUser: number) {
    return this.http.get<CommentProfileSummary[]>(base_url + `/getCommentProfileByUser/${idUser}`, { withCredentials: true });
  }
}
