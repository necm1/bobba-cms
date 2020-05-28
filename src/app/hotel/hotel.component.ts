import { Component, OnInit, OnDestroy, NgZone, Inject, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { client as clientConfig } from 'src/app/config';
import * as swfobject from 'es-swfobject';
import { TitleService } from 'src/app/services/title.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as FlashDetect from 'flash-detect';
import { Location, DOCUMENT } from '@angular/common';

import * as alert from 'alertifyjs';
import { Command } from '../models/user/command';
// import { WebsocketService } from '../services/websocket.service';

declare global {
  interface Window {
    FlashExternalInterface: any;
    FlashExternalGameInterface: any;
  }
}

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
  animations: [
    trigger('fadeOut', [
      state('1', style({ opacity: 0, zIndex: -1 })),
      state('0', style({ opacity: 1 })),

      transition('* => *', animate('300ms ease-in')),
    ]),

    trigger('slideInOut', [
      state('1', style({ transform: 'translateY(1%)' })),
      state('0', style({ transform: 'translateY(130%)' })),

      transition('* => *', animate('300ms ease-in')),

      // transition(':enter', [
      //   style({ transform: 'translateY(130%)' }),
      //   animate('350ms ease-in', style({ transform: 'translateY(1%)' }))
      // ]),

      // transition(':leave', [
      //   style({ transform: 'translateY(1%)' }),
      //   animate('350ms ease-in', style({ transform: 'translateY(130%)' }))
      // ])
    ])
  ]
})
export class HotelComponent implements OnInit, OnDestroy {
  ssoStream: Subscription;
  commandsStream: Subscription;
  commandSubjectStream: Subscription;
  routerStream: Subscription;
  socketStream: Subscription;

  loaded = false;

  commands: Command[];
  commandEvent: CustomEvent;
  chatInput: string;

  commandTrigger = false;
  commandSubject = new Subject<boolean>();

  constructor(
    private router: Router,
    private userService: UserService,
    private titleService: TitleService,
    private zone: NgZone,
    private location: Location,
    @Inject(DOCUMENT) private document,
    // private webSocketService: WebsocketService
  ) {
    this.routerStream = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/hotel') {
          this.document.getElementById('client-ui').style.zIndex = '99';
          this.document.getElementById('client-ui').style.opacity = '1';

          this.titleService.set('Hotel');
        } else {
          this.document.getElementById('client-ui').style.zIndex = '-1';
          this.document.getElementById('client-ui').style.opacity = '0';
        }
      }
    });
  }

  ngOnInit(): void {
    const flashDetected = new FlashDetect();
    this.commandSubjectStream = this.commandSubject.subscribe(num => this.commandTrigger = num);

    if (!this.loaded && flashDetected.installed) {
      require('./habboapi.js');
      require('./client.js');

      this.ssoStream = this.userService.sso().subscribe({
        next: ticket => {
          if (ticket.status !== 200) {
            alert.error('SSO-Ticket konnte nicht generiert werden.');
            return;
          }

          const el = this.document.getElementById('client');

          this.commandsStream = this.userService.commands().subscribe(commands => this.commands = commands);
          clientConfig.vars['sso.ticket'] = ticket.data.auth_ticket;

          swfobject.embedSWF(clientConfig.swf,
                             el,
                             '100%',
                             '100%',
                             11,
                             clientConfig.express,
                             clientConfig.vars,
                             clientConfig.params);

          window.FlashExternalInterface = {};
          window.FlashExternalGameInterface = {};

          window.FlashExternalInterface.logLoginStep = (e: any) => {
            if (e === 'client.init.start') {
              this.document.getElementById('loader-progress').innerHTML = '10%';
            }

            if (e === 'client.init.core.init') {
              this.document.getElementById('loader-progress').innerHTML = '25%';
            }

            if (e === 'client.init.auth.ok') {
              this.document.getElementById('loader-progress').innerHTML = '50%';

              // this.socketStream = this.webSocketService.connect(ticket.data.auth_ticket).subscribe(
              //   msg => console.log(msg),
              //   err => console.error(err),
              //   () => {
              //     console.log('verbunden!');
              //   }
              // );
            }

            if (e === 'client.init.localization.loaded') {
              if (!this.loaded) {
                this.loaded = true;
              }

              this.document.getElementById('loader-progress').innerHTML = '75%';
            }
          };

          window.FlashExternalInterface.disconnect = () => {
            this.document.getElementById('disconnected').style.display = 'block';
          };

          window.FlashExternalInterface.bobbaChat = (e: string) => {
            if (!this.commandTrigger && e.indexOf(':', 0) !== -1) {
              this.commandSubject.next(true);
            }  else if (this.commandTrigger && e.indexOf(':', 0) === -1) {
              this.commandSubject.next(false);
            }

            console.log(this.commandTrigger);
          };

          window.FlashExternalInterface.logout = () => this.zone.run(() => {
            this.userService.logout();
            this.router.navigate(['/']);
          });

          window.FlashExternalGameInterface.showGame = (url: any) => {
            const frame = this.document.createElement('iframe');

            frame.src = url;
            frame.style.position = 'absolute';
            frame.style.top = '0';
            frame.style.left = '0';
            frame.width = '100%';
            frame.height = '100%';
            frame.style.bottom = '0';
            frame.style.right = '0';
            frame.style.height = '100%';
            frame.style.width = '100%';
            frame.style.zIndex = '99999';
            frame.frameBorder = '0';

            let loadTimes = 0;

            frame.onload = (a: any) => {
                loadTimes++;
                if (loadTimes > 1) {
                    frame.remove();
                }
            };

            window.document.body.appendChild(frame);
          };
        },
        error: () => {
          alert.error('Etwas ist schiefgelaufen!');
          return;
        }
      });
    } else {
      document.getElementById('client-flash').style.display = 'block';
    }
  }

  handleCommand(command: string) {
    if (this.commandTrigger) {
      this.commandSubject.next(false);
    }

    window.dispatchEvent(new CustomEvent('commandMessage', {
      detail: {
        command
      }
    }));
  }

  back() {
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.ssoStream && !this.ssoStream.closed) {
      this.ssoStream.unsubscribe();
    }

    if (this.commandsStream && !this.commandsStream.closed) {
      this.commandsStream.unsubscribe();
    }

    if (this.commandSubjectStream && !this.commandSubjectStream.closed) {
      this.commandSubjectStream.unsubscribe();
    }

    if (this.routerStream && !this.routerStream.closed) {
      this.routerStream.unsubscribe();
    }

    if (this.socketStream && !this.socketStream.closed) {
      this.socketStream.unsubscribe();
    }
  }

}
