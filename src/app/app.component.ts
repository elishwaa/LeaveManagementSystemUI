import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { LeaveMgmtService } from './services/leave-mgmt.service';
import { CookieService } from 'ngx-cookie-service';
import {AdalService} from 'adal-angular4'
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'LeaveManagementSystem';


  constructor( public _service: LeaveMgmtService, public cookieService: CookieService, public cdRef : ChangeDetectorRef, public adalService: AdalService) {

  }
 
  inputEncryptionString: string = "Hello World";
  inputDecryptionString: string =  "5ktR/fUKBYEfPxLceE0u8A==";
  key: string = "VmtZcDNzNnY5eSRCJkUpSA==";
  encryptedOutput:string;
  decryptedOutput:string;

  visible :boolean = false;
  back: boolean = false;
  signInForm: FormGroup;
  ngOnInit(){

    this.encrypt(this.key,this.inputEncryptionString);
    this.decrypt(this.key, this.inputDecryptionString);
    

    this.adalService.init(environment.authConfig);
    this.adalService.handleWindowCallback();
    if(!this.adalService.userInfo.authenticated)
    this.adalService.login();

    this.signInForm = new FormGroup({
      username: new FormControl(),
      // password: new FormControl('',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(10)]))
    });

    if(this.adalService.userInfo.userName){
      this.signInForm.value.username = this.adalService.userInfo.userName;
      this.login();
    }
    if(this.cookieService.get('LoggedIn')){
      this.visible = true;
    }
    this._service.visible.subscribe(
      data=>{
        if('LoggedInStatus' in data){
          this.visible = data.LoggedInStatus;
        }
      }
    );
    this._service.back.subscribe(
      data=>{
        if('back' in data){
          this.back = data.back;
          this.cdRef.detectChanges();
        }
      }
    );
   
  }
  logout(){
    this._service.logout();
  }
  home(){
    let type = JSON.parse(localStorage.getItem('empType'));
    this._service.routeToHome(type);
  }
  goBack(){
    this._service.goBack();
  }
  
  login() {
    this._service.getEmployeeInfo(this.signInForm.value).subscribe(
      (data) => {
        if (data.id != 0) {
          this.cookieService.set('LoggedIn', data.typeName,0.25);
          localStorage.setItem('employee', JSON.stringify(data));
          localStorage.setItem('empType', data.typeId);
          this._service.routeToHome(data.typeId);
          this._service.visible.emit({ LoggedInStatus: true });
        }
        else {
          this._service.openSnackBar("Invalid Login Details", "Login again")
        }
      });
  }

//   encrypt() {  
    
//     debugger;
//     this.encryptedOutput = (CryptoJS.AES.encrypt(this.inputEncryptionString.trim(), this.key.trim()).toString());  
//     console.log(this.encryptedOutput); 
// }  

//   decrypt(){
//     this.decryptedOutput = CryptoJS.AES.decrypt(this.inputDecryptionString.trim(), this.key.trim()).toString(CryptoJS.enc.Utf8);  
//     console.log(this.decryptedOutput);
//   }
  encrypt(keys:string, value:string){
    debugger
    var key = CryptoJS.enc.Base64.parse(keys);
    var iv = CryptoJS.enc.Base64.parse("V8T1o2KOZcp+wj7o2nj1lQ==")
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128,
        blockSize:128,
        key:key,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    
    debugger
    this.encryptedOutput = encrypted.toString();
    console.log(this.encryptedOutput);
    
   
  }

  //The get method is use for decrypt the value.
  decrypt(keys:string, value:string){
    var key = CryptoJS.enc.Base64.parse(keys);
    var iv = CryptoJS.enc.Base64.parse("V8T1o2KOZcp+wj7o2nj1lQ==")
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128,
        blockSize: 128,
        key:key,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    console.log(decrypted.toString(CryptoJS.enc.Utf8));
    debugger
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}


