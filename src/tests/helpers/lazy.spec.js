import { count } from 'lib0/indexeddb.js'
import { lazy, lazyTimer } from '../../helpers/lazy.js'

describe('lazy timer', () => {

    test('runs on intervals that double', () => {
        jest.useFakeTimers()
        const callback = jest.fn();
        const timer = lazyTimer(callback);
        expect(callback).not.toBeCalled();
        jest.advanceTimersByTime(400);
        expect(callback).toHaveBeenCalledTimes(1); // 300
        jest.advanceTimersByTime(800);
        expect(callback).toHaveBeenCalledTimes(2); // 900 (300 + 600)
        jest.advanceTimersByTime(1600);
        expect(callback).toHaveBeenCalledTimes(3); // 2100 (900 + 1200)
        jest.advanceTimersByTime(3200);
        expect(callback).toHaveBeenCalledTimes(4); // 4500 (2100 + 2400)
        jest.advanceTimersByTime(6400);
        expect(callback).toHaveBeenCalledTimes(5); // 9300 (4500 + 4800)
        jest.useRealTimers()
    })
    
    test('stays at same interval once it reached maxInterval', () => {
        jest.useFakeTimers()
        const callback = jest.fn();
        const timer = lazyTimer(callback);
        jest.advanceTimersByTime(10000);
        expect(callback).toHaveBeenCalledTimes(5); // see above
        jest.advanceTimersByTime(10000);
        expect(callback).toHaveBeenCalledTimes(7); // 14100 (9300 + 4800) and 18900 (14100 + 4800)
        jest.advanceTimersByTime(10000);
        expect(callback).toHaveBeenCalledTimes(9); // roughly every 5 seconds
        jest.useRealTimers()
    })
    
    test('starts from scratch after wakeUp', () => {
        jest.useFakeTimers()
        const callback = jest.fn();
        const timer = lazyTimer(callback);
        jest.advanceTimersByTime(20000);
        expect(callback).toHaveBeenCalledTimes(7); // see above
        timer.wakeUp()
        jest.advanceTimersByTime(400);
        expect(callback).toHaveBeenCalledTimes(8); // 300
        jest.advanceTimersByTime(800);
        expect(callback).toHaveBeenCalledTimes(9); // 900 (300 + 600)
        jest.advanceTimersByTime(1600);
        expect(callback).toHaveBeenCalledTimes(10); // 2100 (900 + 1200)
        jest.useRealTimers()
    })
    
    test('goes to maxInterval when sleep is called', () => {
        jest.useFakeTimers()
        const callback = jest.fn();
        const timer = lazyTimer(callback);
        jest.advanceTimersByTime(400);
        expect(callback).toHaveBeenCalledTimes(1); // see above
        timer.sleep()
        jest.advanceTimersByTime(4000);
        expect(callback).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(800);
        expect(callback).toHaveBeenCalledTimes(2);
        jest.advanceTimersByTime(4800);
        expect(callback).toHaveBeenCalledTimes(3);
        jest.useRealTimers()
    })
    
    test('allows to clear interval', () => {
        jest.useFakeTimers()
        const callback = jest.fn();
        const timer = lazyTimer(callback);
        jest.advanceTimersByTime(400);
        expect(callback).toHaveBeenCalledTimes(1); // see above
        clearInterval(timer.interval)
        jest.advanceTimersByTime(10000);
        expect(callback).toHaveBeenCalledTimes(1);
        jest.useRealTimers()
    })
    
    test('can stay awake by calling .wakeUp in callback', () => {
        jest.useFakeTimers()
        let timer
        const callback = jest.fn();
        const energize = () => {
            callback()
            timer.wakeUp()
        }
        timer = lazyTimer(energize);
        jest.advanceTimersByTime(3200);
        expect(callback).toHaveBeenCalledTimes(10);
        jest.useRealTimers()
    })
    
})

describe('lazy function', () => {

    test('skips 1 than 3 than 7 than 15', () => {
        const inner = jest.fn()
        const fn = lazy(inner)
        callNTimes(32, fn)
        expect(inner.mock.calls.map(call => call[0])).toEqual([1,3,7,15,31])
    })

    test('starts again after being waken up', () => {
        const inner = jest.fn()
        const fn = lazy(inner)
        callNTimes(3, fn)
        fn.wakeUp()
        callNTimes(10, fn)
        expect(inner.mock.calls.map(call => call[0])).toEqual([1,3,1,3,7])
    })

    test('respects skipAtMost option', () => {
        const inner = jest.fn()
        const fn = lazy(inner, { skipAtMost: 3 })
        callNTimes(20, fn)
        expect(inner.mock.calls.map(call => call[0])).toEqual([1,3,7,11,15,19])
    })

    test('skipAtMost defaults to 15', () => {
        const inner = jest.fn()
        const fn = lazy(inner)
        callNTimes(64, fn)
        expect(inner.mock.calls.map(call => call[0])).toEqual([1,3,7,15,31,47,63])
    })

    test('skips skipAtMost after sleep was called', () => {
        const inner = jest.fn()
        let count = 0
        const lazyFn = lazy(() => inner(count), { skipAtMost: 5 })
        const trigger = () => {
            count++
            lazyFn()
        }
        callNTimes(4, trigger)
        lazyFn.sleep()
        callNTimes(20, trigger)
        expect(inner.mock.calls.map(call => call[0])).toEqual([1,3,9,15,21])
    })

})

function callNTimes(n, fn) {
    for (let i = 1; i <= n; i++) { fn(i) } 
}