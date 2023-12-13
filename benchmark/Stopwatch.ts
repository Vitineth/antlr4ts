/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

import { TimeSpan } from "./TimeSpan";

export class Stopwatch {
	private _start?: number;
	private _elapsed: number = 0;

	public static startNew(): Stopwatch {
		let result = new Stopwatch();
		result.start();
		return result;
	}

	public start(): void {
		if (this._start !== undefined) {
			throw new Error("The stopwatch is already started.");
		}

		this._start = performance.now();
	}

	public elapsed(): TimeSpan {
		let result = this._elapsed;

		if (this._start !== undefined) {
			result = performance.now() - this._start;
		}

		const seconds = Math.floor(result / 1000);
		const millis = result % 1000;
		const nanos = millis / 1e6;
		return new TimeSpan(seconds, nanos);
	}

	public elapsedMillis(): number {
		return this.elapsed().totalMilliseconds;
	}
}
