import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  style = document.querySelector("#theme");


  constructor(private settings: SettingsService) { }

  ngOnInit(): void {


    this.settings.working();
  }

  changeTheme(theme: string){

    this.settings.changeTheme(theme);

    this.settings.working();

  }



}
