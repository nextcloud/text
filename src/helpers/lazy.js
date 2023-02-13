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
 *
 * @param {Function} callback to be triggered by the timer
 */
function lazyTimer(callback) {
	const fn = lazy(callback)
	fn.interval = setInterval(fn, 300)
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
 * @param {number} options.skipAtMost maximum number of calls to skip, default: 15
 */
export function lazy(inner, { skipAtMost = 15 } = {}) {
	let count = 0
	const result = (...args) => {
		count++
		if (runFor(count, skipAtMost)) {
			return inner(...args)
		}
	}
	result.wakeUp = () => {
		count = 0
	}
	result.sleep = () => {
		const previousRun = runsBefore(count)
		const previousCount = countAt(previousRun)
		count = lastCountAfterDoubling(skipAtMost) + count - previousCount
	}
	return result
}

/**
 * @param {number} count time the function is being called
 * @param {number} skipAtMost maximum number of calls to skip
 */
function runFor(count, skipAtMost) {
	const nextRun = runsBefore(count) + 1
	const skips = skipsBefore(nextRun)
	if (!skipAtMost || skips < skipAtMost) {
		return count === countAt(nextRun)
	} else {
		const runEvery = skipAtMost + 1
		const result = (count - lastCountAfterDoubling(skipAtMost)) % runEvery === 0
		return result
	}
}

/**
 * At what count does the inner function run for the nth time.
 *
 * @param {number} n time the inner function runs
 * @return {number}
 */
function countAt(n) {
	return 2 ** n - 1
}

/**
 * How many runs happened before count.
 *
 * @param {number} count time the lazy function is being called
 * @return {number}
 */
function runsBefore(count) {
	return Math.floor(Math.log2(count))
}

/**
 * How many calls of the lazy function are skipped before it runs the nth time.
 *
 * @param {number} n time the inner function runs
 * @return {number}
 */
function skipsBefore(n) {
	return (n === 1) ? 1 : countAt(n - 1)
}

/**
 * Count when the limit to doubling the intervals was reached.
 *
 * @param {number} skipAtMost upper limit for doubling
 * @return {number}
 */
function lastCountAfterDoubling(skipAtMost) {
	const lastRunToDoubleAfter = Math.floor(Math.log2(skipAtMost + 1))
	return countAt(lastRunToDoubleAfter + 1)
}
