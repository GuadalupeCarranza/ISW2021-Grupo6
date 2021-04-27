import { animate, state, style, transition, trigger } from '@angular/animations';

export const onSideNavChange = trigger('onSideNavChange', [
  state('close',
    style({
      width: '30px'
    })
  ),
  state('open',
    style({
      'min-width': '200px'
    })
  ),
  transition('close => open', animate('500ms ease-in')),
  transition('open => close', animate('450ms ease-in')),
]);

export const animateTextTraslate = trigger('animateTextTraslate', [
  state('in', style({transform: 'translateX(0)'})),
  transition('void => *', [
    style({transform: 'translateX(50%)'}),
    animate(300)
  ]),
  transition('* => void', [
    animate(150, style({transform: 'translateX(-100%)'}))
  ])
]);

export const animateText = trigger('animateText', [
  state('show', style({
    opacity: 1,
    display: 'block',
  })),
  state('hide', style({
    opacity: 0,
    display: 'none',
  })),
  transition('show => hide', [
    animate('300ms')
  ]),
  transition('hide => show', [
    animate('150ms')
  ]),
  transition('* => hide', [
    animate('300ms')
  ]),
  transition('* => show', [
    animate('150ms')
  ]),
  transition('show <=> hide', [
    animate('150ms')
  ]),
  transition('* => show', [
    animate('300ms',
      style({opacity: '*'}),
    ),
  ]),
  transition('* => *', [
    animate('300ms')
  ])
]);

export const animateSubText = trigger('animateSubText', [
  state('hide',
    style({
      display: 'none',
      opacity: 0,
    })
  ),
  state('show',
    style({
      display: 'block',
      opacity: 1,
    })
  ),
  transition('hide => show', [
    animate('300ms',
      style({opacity: '*'}),
    ),
  ]),
]);



