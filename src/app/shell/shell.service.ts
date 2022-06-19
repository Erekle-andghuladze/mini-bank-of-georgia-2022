import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Client } from './modules/bpm/client.model';


@Injectable({
  providedIn: 'root'
})
export class ShellService {
  currentClient = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }


  autoLoginClient() {
    const clientData = JSON.parse(localStorage.getItem('clientData'));
    if (!clientData) {
      return;
    }

    const curClient = new Client(
      clientData.clientKey,
      clientData.firstName,
      clientData.image,
      clientData.lastName,
      clientData.plus,
      clientData.sumAmount
    );
    this.currentClient.next(curClient);
  }

  fetchClient(clientKey: number) {
    return this.http.
    get<Client>(`clients?firstName=&lastName=&clientKey=${clientKey}`)
  .pipe(
      map(updatedClient => updatedClient[0])
    );
  }
}
