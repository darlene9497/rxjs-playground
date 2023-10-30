import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax'

/**cold observable - HTTP request */
const ajax$ = ajax<any>('https://random-data-api.com/api/name/random_name')
    
ajax$.subscribe(
    data => console.log('name 1:', data.response.first_name)
)

ajax$.subscribe(
    data => console.log('name 2:', data.response.first_name)
)

ajax$.subscribe(
    data => console.log('name 3:', data.response.first_name)
)

/**hot observable */
const helloButton = document.querySelector('button#hello')

const helloClick$ = new Observable<MouseEvent>(subscriber => {
    helloButton.addEventListener('click', (event: MouseEvent) => {
        subscriber.next(event);
    })
})

helloClick$.subscribe(
    event => console.log('sub 1:', event.type, event.x, event.y)
)

setTimeout(() => {
    console.log('subscription 2 starts');
    helloClick$.subscribe(
        event => console.log('sub 2:', event.type, event.x, event.y)
    );
}, 5000);



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