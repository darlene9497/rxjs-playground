import { Observable } from 'rxjs';

const observable$ = new Observable<string>(subscriber => {
  subscriber.next('Darlene');
  setTimeout(() => subscriber.next('Norman'), 2000);
  setTimeout(() => subscriber.next('Brolin'), 4000);
});

console.log('First subscription')
observable$.subscribe(value => console.log('sub 1:', value));

/**Unsubscribing */
// const subscription = observable$.subscribe(value => console.log(value));

// setTimeout(() => {
//   console.log('Unsubscribed')
//   subscription.unsubscribe();
// }, 3000)

/**multiple subscription code which will run independently */
setTimeout(() => {
  console.log('Second subscription')
  observable$.subscribe(value => console.log('sub 2:', value));
}, 1000)