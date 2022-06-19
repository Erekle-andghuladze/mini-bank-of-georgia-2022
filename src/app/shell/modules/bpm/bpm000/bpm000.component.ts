import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

import { ClientsService} from '../clients.service';
import {Client} from '../client.model';
import {LoaderService} from '../../../../shared/loader/loader.service';
import {ShellService} from '../../../shell.service';


@Component({
  selector: 'bg-bpm000',
  templateUrl: './bpm000.component.html',
  styleUrls: ['./bpm000.component.scss']
})

export class Bpm000Component implements OnInit {
  clientForm: FormGroup;
  clients: Client[];
  currentClient: Client;

  constructor(
    private clientsService: ClientsService,
    private loaderService: LoaderService,
    private shellService: ShellService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.clients = null;
  }

  onfetchClients() {
    this.clientsService.fetchClients(this.clientForm.value).pipe(this.loaderService.useLoader)
      .subscribe((clients) => {
        if (!clients) {
          this.clients = [];
        }
        this.clients = clients;
      });
  }

  onSearch() {
    this.onfetchClients();
  }

  getClientData(clientKey: number) {
    this.currentClient = this.clients.find(client => client.clientKey === clientKey);
    this.shellService.currentClient.next(this.currentClient);
    if (!this.currentClient){ return; }
    this.router.navigate(['/krn']);
    localStorage.setItem('clientData', JSON.stringify(this.currentClient));
  }

  initForm() {
    this.clientForm = new FormGroup({
      fistName: new FormControl( ''),
      lastName: new FormControl(''),
      clientKey: new FormControl(''),
    });
  }
}


