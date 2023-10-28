import { Observable } from 'rxjs';
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
const interval$ = new Observable<number>(subscriber => {
    let counter = 1

    const checkInterval = setInterval(() => {
        console.log('Emitted', counter)
        subscriber.next(counter++)
    }, 2000)

    return () => {
        clearInterval(checkInterval)
    }
})

const subscription = interval$.subscribe(value => console.log(value))

setTimeout(() => {
    console.log('Unsubscribed')
    subscription.unsubscribe()
}, 7000)
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