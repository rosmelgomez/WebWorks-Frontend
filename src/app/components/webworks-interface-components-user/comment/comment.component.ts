import {Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {User} from "../../../model/user";
import {CommentProfile} from "../../../model/commentProfile";
import {CommentProfileService} from "../../../services/commentprofile.service";
import {SystemScoreService} from "../../../services/systemscore.service";
import {SystemScore} from "../../../model/systemScore";
import {CommentProfileSummary} from "../../../modelComplement/commentProfileSummary";

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-comment',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})

export class CommentComponent implements OnInit {
  public commentForm!: FormGroup
  users = { data: [] as User[] }
  comments:{[key:number]:CommentProfileSummary[]}={}
  commentsCheck:{[key:number]:Boolean}={}
  commentsLoading: {[key: number]: boolean} = {}
  commentsError: {[key: number]: string} = {}
  isLoading = true;
  loadError = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private commentService:CommentProfileService,
    private systemScoreService:SystemScoreService,
  ) {}

  ngOnInit(): void {
    console.clear()
    this.reactiveForm()
  }

  reactiveForm(): void {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
      score: ['', Validators.required]
    })
    this.isLoading = true;
    this.loadError = '';
    this.userService.gerAllUsers().subscribe({
      next: (users:User[])=>{
        this.users.data = users;
        this.users.data = this.users.data.filter((user: User) => user.id !== parseInt(this.userService.getId()));
        this.isLoading = false;
        users.forEach((user) => {
          this.getComment(user.id);
        });
      }, error: () => {
        this.isLoading = false;
        this.loadError = 'No se pudieron cargar los perfiles.';
      }})
  }

  check(): string{
    return this.userService.getId()
  }

  getComment(idUser:number) {
    this.commentsLoading[idUser] = true;
    this.commentsError[idUser] = '';
    this.commentService.getComment(idUser).subscribe({
      next: (comments:CommentProfileSummary[])=>{
        this.comments[idUser]=comments;
        this.commentsCheck[idUser]=false;
        this.commentsLoading[idUser] = false;
      }, error: () => {
        this.commentsLoading[idUser] = false;
        this.commentsError[idUser] = 'No se pudieron cargar los comentarios.';
      }})
  }

  createComment(idUserComment:number) {
    if(this.commentForm.valid){
      const comment : CommentProfile ={
        id:0,
        score: parseInt(this.commentForm.get("score")!.value),
        comment:this.commentForm.get("comment")!.value,
        id_user:parseInt(this.userService.getId())
      }
      this.commentService.addComment(comment).subscribe(
        (idComment:number)=>{
          if(idComment!=null){
            const score :SystemScore ={
              id:0,
              dateScore : new Date(),
              id_user:idUserComment,
              id_commentProfile: idComment
            }
            this.systemScoreService.addScore(score).subscribe(
              (check :Boolean)=>{
                if(check){
                  this.commentsCheck[idUserComment]=false;
                  this.reactiveForm();
                }
              }
            )
          }
        }
      )

    }else{
      alert("ingrese todos los datos ")
    }

  }

}
