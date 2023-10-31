import { Observable, from, timer, forkJoin } from 'rxjs';
import { ajax } from 'rxjs/ajax'

/**creation functions */
/**of function */
// of('Norman', 'Brolin', 'Darlene').subscribe({
//     next: value => console.log(value),
//     complete: () => console.log('Completed')
// });

// function of(...args: string[]): Observable<string> {
//     return new Observable<string>(subscriber => {
//         for(let i = 0; i < args.length; i++) {
//         subscriber.next(args[i]);
//     }
//         subscriber.complete();
//     });
// }

/**from function */
// const somePromise = new Promise((resolve, reject) => {
//     //resolve('Resolved!');
//     reject('Rejected!');
// });

// const observableFromPromise$ = from(somePromise);

// observableFromPromise$.subscribe({
//     next: value => console.log(value),
//     error: err => console.log(err),
//     complete: () => console.log('Completed')
// });

/**fromEvent() function*/
// const triggerButton = document.querySelector('button#trigger');

// const triggerClick$ = new Observable<MouseEvent>(subscriber => {
// const clickHandlerFn = (event: MouseEvent) => {
//     console.log('Event callback executed');
//     subscriber.next(event);
// };

// triggerButton.addEventListener('click', clickHandlerFn);
// return () => {
//     triggerButton.removeEventListener('click', clickHandlerFn);
// };
// });

// const subscription = triggerClick$.subscribe(
//     event => console.log(event.type, event.x, event.y)
// );

// setTimeout(() => {
//     console.log('Unsubscribe');
//     subscription.unsubscribe();
// }, 5000);

/**timer/interval() function */
// console.log('Timer function has started');

// const timer$ = new Observable<number>(subscriber => {
//     const timeoutId = setTimeout(() => {
//         //console.log('Timeout!');
//         subscriber.next(0);
//         subscriber.complete();
//     }, 2000);
    
//     return () => clearTimeout(timeoutId);
// });

// const subscription = timer$.subscribe({
//     next: value => console.log(value),
//     complete: () => console.log('Timer has completed')
// });

// setTimeout(() => {
//     subscription.unsubscribe();
//     console.log('Unsubscribe from timeout');
// }, 1000);

/**interval() function */
// console.log('Interval function has started');

// const interval$ = new Observable<number>(subscriber => {
//     let counter = 0;
    
//     const intervalId = setInterval(() => {
//         subscriber.next(counter++);
//     }, 1000);
    
//     return () => clearInterval(intervalId);
// });

// const subscription = interval$.subscribe({
//     next: value => console.log(value),
//     complete: () => console.log('Interval has completed')
// });

// setTimeout(() => {
//     subscription.unsubscribe();
//     console.log('Unsubscribe from the interval');
// }, 5000);

/**forkJoin() function - make multiple HTTP calls */
const randomName$ = ajax('https://random-data-api.com/api/name/random_name');

const randomNation$ = ajax('https://random-data-api.com/api/nation/random_nation');

const randomFood$ = ajax('https://random-data-api.com/api/food/random_food');

// randomName$.subscribe(ajaxResponse => console.log(ajaxResponse.response.first_name));
// randomNation$.subscribe(ajaxResponse => console.log(ajaxResponse.response.capital));
// randomFood$.subscribe(ajaxResponse => console.log(ajaxResponse.response.dish));

forkJoin<any>([randomName$, randomNation$, randomFood$]).subscribe(
    ([nameAjax, nationAjax, foodAjax]) => 
    console.log(`${nameAjax.response.first_name} is from ${nationAjax.response.capital} and likes to eat ${foodAjax.response.dish}.`)
);

/**forkJoin error scenario */
const a$ = new Observable(subscriber => {
    setTimeout(() => {
        subscriber.next('A');
        subscriber.complete();
    }, 5000);

    return () => {
        console.log('A teardown');
    };
});

const b$ = new Observable(subscriber => {
    setTimeout(() => {
        subscriber.error('Failure from B!');
    }, 3000);
    
    return () => {
        console.log('B teardown');
    };
});

forkJoin([a$, b$]).subscribe({
    next: value => console.log(value),
    error: err => console.log('Error:', err)
});
/**cold observable - HTTP request */
// const ajax$ = ajax<any>('https://random-data-api.com/api/name/random_name')
    
// ajax$.subscribe(
//     data => console.log('name 1:', data.response.first_name)
// )

// ajax$.subscribe(
//     data => console.log('name 2:', data.response.first_name)
// )

// ajax$.subscribe(
//     data => console.log('name 3:', data.response.first_name)
// )

/**hot observable */
// const helloButton = document.querySelector('button#hello')

// const helloClick$ = new Observable<MouseEvent>(subscriber => {
//     helloButton.addEventListener('click', (event: MouseEvent) => {
//         subscriber.next(event);
//     })
// })

// helloClick$.subscribe(
//     event => console.log('sub 1:', event.type, event.x, event.y)
// )

// setTimeout(() => {
//     console.log('subscription 2 starts');
//     helloClick$.subscribe(
//         event => console.log('sub 2:', event.type, event.x, event.y)
//     );
// }, 5000);

/**exercise */
// const observer$ = new Observable<string>(subscriber => {
//     subscriber.next('Alice');
//     subscriber.next('Ben');
//     setTimeout(() => {
//         subscriber.next('Charlie');
//         // subscriber.complete()
//     }, 2000);
//     setTimeout(() => subscriber.error(new Error('Failed')), 4000);

//     return () => {
//         console.log('Teardown')
//     };
// });

// observer$.subscribe({
//     next: value => console.log(value),
//     // complete: () => console.log('Completed')
//     error: err => console.log(err.message)
// })

/**unsubscribing */
// const interval$ = new Observable<number>(subscriber => {
//     let counter = 1

//     const checkInterval = setInterval(() => {
//         console.log('Emitted', counter)
//         subscriber.next(counter++)
//     }, 2000)

//     return () => {
//         clearInterval(checkInterval)
//     }
// })

// const subscription = interval$.subscribe(value => console.log(value))

// setTimeout(() => {
//     console.log('Unsubscribed')
//     subscription.unsubscribe()
// }, 7000)
// const observable$ = new Observable<string>(subscriber => {
//   subscriber.next('Darlene');
//   setTimeout(() => subscriber.next('Norman'), 2000);
//   setTimeout(() => subscriber.next('Brolin'), 4000);
// });

// console.log('First subscription')
// observable$.subscribe(value => console.log('sub 1:', value));

/**Unsubscribing */
// const subscription = observable$.subscribe(value => console.log(value));

// setTimeout(() => {
//   console.log('Unsubscribed')
//   subscription.unsubscribe();
// }, 3000)

/**multiple subscription code which will run independently */
// setTimeout(() => {
//   console.log('Second subscription')
//   observable$.subscribe(value => console.log('sub 2:', value));
// }, 1000)

// const manifesting$ = new Observable(goal => {
//     goal.next('financially stable');
//     setTimeout(() => goal.next('dream apartment'), 1000);
//     setTimeout(() => goal.next('dream vacation'), 2000);
// })

// manifesting$.subscribe(dream => console.log(dream))