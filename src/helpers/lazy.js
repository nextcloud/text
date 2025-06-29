/*
 * @copyright Copyright (c) 2023 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * Call callback in intervals that double
 *
 * Returns a handle to modify the interval:
 * - handle.wakeUp() resets it to the minimum.
 * - handle.sleep() uses maximum interval right away.
 * - handle.interval can be used to clear the interval:
 *   `clearInterval(handle.interval)`
 *
 * @param {Function} callback to be triggered by the timer
 * @param {object} options optional
 * @param {number} options.minInterval minimum interval between two calls
 * @param {number} options.maxDelay maximum factor to multiply the interval by
 * @return {Function} handle to modify behavior
 */
function lazyTimer(callback, { minInterval = 300, maxDelay = 16 } = {}) {
	const fn = lazy(callback, { maxDelay })
	fn.interval = setInterval(fn, minInterval)
	return fn
}

export { lazyTimer }

/**
 * Throttle a function so it only runs in intervals that double on every run.
 *
 * const fn = lazy(inner)
 * fn() // call inner
 * fn() // skip - so interval between inner() is 2x the interval between fn()
 * fn() // call inner
 * fn(); fn(); fn() // skip all - so interval is 4x the interval between fn()
 * fn() // call inner
 *
 * fn.wakeUp() // will start from scratch.
 *
 * fn.sleep() // will skip `skipAtMost` steps between all runs until fn.wakeUp() is called.
 *
 * @param {Function} inner function to be called
 * @param {object} options optional
 * @param {number} options.maxDelay maximum interval between two calls to inner
 */
export function lazy(inner, { maxDelay = 16 } = {}) {
	let count = 0
	let interval = 1
	const result = (...args) => {
		count++
		if (count === interval) {
			count = 0
			interval = Math.min(interval * 2, maxDelay)
			return inner(...args)
		}
	}
	result.wakeUp = () => {
		count = 0
		interval = 1
	}
	result.sleep = () => {
		interval = maxDelay
	}
	return result
}
