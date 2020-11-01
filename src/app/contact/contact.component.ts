import { Component, OnInit } from '@angular/core';
import {ContactService} from '../services/contact.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public listeContacts;
  public keyword:string= "";
  private size: number =5;
  private page: number=0;

  public currentPage:number=0;
  public totalPages:number;
  public pages:Array<number>;
  private currentKeyword: string;


  constructor(private contactService:ContactService,private router:Router) { }

  ngOnInit(): void {
    this.getContact();
  }

  public getContact(){
    ///produits/search/byDesignationPage?mc
    this.contactService.getContacts("/contacts/search/byNomPage?mc="+this.keyword+"&size="+this.size+"&page="+this.page)
      .subscribe(data=>{
        this.totalPages=data["page"].totalPages;
        this.pages=new Array<number>(this.totalPages);
        this.listeContacts=data;
      },error => {
        console.log(error);
      });
  }

  onSaveContact(data) {
     this.contactService.postContact("/contacts",data)
       .subscribe(resp=>{
         this.getContact();
       },error => {
         console.log(error);
       });
  }

  chercher(keyword) {
    console.log(keyword);
    //this.currentPage=0;
    this.currentKeyword=keyword;
    this.getContact();
  }

  onPageContact(i: number) {
    this.currentPage=i;
    this.chercher(this.currentKeyword);
  }
}
