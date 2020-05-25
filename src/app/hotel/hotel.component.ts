import { Component, OnInit, OnDestroy, NgZone, Inject, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
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
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeOut', [
      state('true', style({ opacity: 0, zIndex: -1 })),
      state('false', style({ opacity: 1, zIndex: 99 })),

      transition('true => false', animate('350ms ease-in')),
      transition('false => true', animate('350ms ease-out'))
    ]),

    trigger('slideInOut', [
      state('true', style({ transform: 'translateY(1%)' })),
      // state('false', style({ transform: 'translateY(130%)' })),

      transition(':enter', [
        style({ transform: 'translateY(130%)' }),
        animate('350ms ease-in', style({ transform: 'translateY(1%)' }))
      ]),

      transition(':leave', [
        style({ transform: 'translateY(1%)' }),
        animate('350ms ease-in', style({ transform: 'translateY(130%)' }))
      ])
    ])
  ]
})
export class HotelComponent implements OnInit, OnDestroy {
  ssoStream: Subscription;
  commandsStream: Subscription;
  routerStream: Subscription;
  socketStream: Subscription;

  commandEvent: CustomEvent;
  public toggle = false;
  public chatInput: string;

  public loaded = false;
  commands: Command[];

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

    if (!this.loaded && flashDetected.installed) {
      require('./habboapi.js');
      // require('./client.js');

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

          window.FlashExternalInterface.logLoginStepEnabled = false;

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
              this.document.getElementById('loader-progress').innerHTML = '75%';
              this.loaded = true;
            }
          };

          window.FlashExternalInterface.bobbaChat = (e: string) => {
            console.log(e);

            if (e.length > 0 && e.includes(':')) {
              if (!this.toggle) {
                this.toggle = true;
              }
            } else {
              this.toggle = false;
            }
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
    this.toggle = !this.toggle;

    window.dispatchEvent(new CustomEvent('commandMessage', {
      detail: {
        command
      }
    }));
  }

  back() {
    // this.location.back();
    this.toggle = !this.toggle;
  }

  ngOnDestroy(): void {
    if (this.ssoStream && !this.ssoStream.closed) {
      this.ssoStream.unsubscribe();
    }

    if (this.commandsStream && !this.commandsStream.closed) {
      this.commandsStream.unsubscribe();
    }

    if (this.routerStream && !this.routerStream.closed) {
      this.routerStream.unsubscribe();
    }

    if (this.socketStream && !this.socketStream.closed) {
      this.socketStream.unsubscribe();
    }
  }

}
