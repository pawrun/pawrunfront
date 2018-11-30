import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  inputEmail;
  inputPassword;

  constructor(public dialog: MatDialog, private router: Router, private loginService: LoginService, private token: TokenStorageService) { }

  ngOnInit() {
  }

  attemptLogin() {
    this.loginService.attemptLogin(this.inputEmail, this.inputPassword).subscribe(
      data => {
        console.log(data);
        this.token.saveToken(data.value);
        console.log('DOBREEEEE LOOGIN');
        this.router.navigate(['dashboard']);
      },
      error => this.openDialog()
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BadCredentialsDialog, {
      width: '180px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'app-bad-credentials-dialog',
  templateUrl: 'bad-credentials.html',
})
export class BadCredentialsDialog {
  constructor(
    public dialogRef: MatDialogRef<BadCredentialsDialog>) {}

    onOkClick(): void {
      this.dialogRef.close();
    }
}
