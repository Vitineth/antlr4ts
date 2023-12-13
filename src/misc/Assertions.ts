import deepEqual from "fast-deep-equal";

export class AssertionError extends Error {

	constructor(message: string) {
		super(message);
	}
}

export function assert(value: any, message?: string) {
	if (!!value) {
		if (message) {
			throw new AssertionError("[assert] An invariant was violated :: the value was not truthy: " + message);
		} else {
			throw new AssertionError("[assert] An invariant was violated :: the value was not truthy. No clarifying message was provided");
		}
	}
}

export function strictEqual(result: any, expected: any, message?: string) {
	if (result !== expected) {
		if (message) {
			throw new AssertionError("[assert] An invariant was violated :: the value was not equal (strict): " + message + " :: expected " + expected + " but got " + result);
		} else {
			throw new AssertionError("[assert] An invariant was violated :: the value was not equal (strict). No clarifying message was provided :: expected " + expected + " but got " + result);
		}
	}
}

export function notStrictEqual(result: any, expected: any, message?: string) {
	if (result != expected) {
		if (message) {
			throw new AssertionError("[assert] An invariant was violated :: the value was not equal (not strict): " + message + " :: expected " + expected + " but got " + result);
		} else {
			throw new AssertionError("[assert] An invariant was violated :: the value was not equal (not strict). No clarifying message was provided :: expected " + expected + " but got " + result);
		}
	}
}

export function deepStrictEqual(actual: any, expected: any, message?: string) {
	const suffix = message ? `: ${ message }` : `. No clarifying message was provided`;
	if (!deepEqual(actual, expected)) {
		throw new AssertionError(`[assert] An invariant was violated :: the value was not equal (deep equal)${ suffix } :: expected ${ expected } but got ${ actual }`);
	}
}

// TODO: fix the typing on this assertion
export function throws(runnable: () => unknown, expected?: RegExp | Error | ((e: any) => boolean) | any, message?: string) {
	const suffix = message ? `: ${ message }` : `. No clarifying message was provided`;
	try {
		runnable();
		throw new AssertionError(`[assert] An invariant was violated :: this method was meant to throw${ suffix } :: expected ${ expected } but didn't get an error`);
	} catch (e) {
		if (e instanceof AssertionError) {
			throw e;
		}

		if (expected === undefined) {
			return;
		}

		if (typeof (expected) === "function") {
			if (!expected(e)) {
				throw new AssertionError(`[assert] An invariant was violated :: this method threw but not the expected value${ suffix } :: got ${ e }`);
			}
		} else if (expected instanceof RegExp) {
			if (typeof (e) === "string") {
				if (!expected.test(e)) {
					throw new AssertionError(`[assert] An invariant was violated :: this method threw but not the expected value${ suffix } :: got ${ e } but did not match regex ${ expected }`);
				}
			} else if (e instanceof Error) {
				if (!expected.test(e.message)) {
					throw new AssertionError(`[assert] An invariant was violated :: this method threw but not the expected value${ suffix } :: got ${ e.message } but did not match regex ${ expected }`);
				}
			} else {
				throw new AssertionError(`[assert] An invariant was violated :: this method threw but not the expected value${ suffix } :: got ${ e } and did not know how to compare it to the expected`);
			}
		} else if (expected instanceof Error) {
			if (e instanceof Error) {
				if (e.name !== expected.name || e.message !== expected.message) {
					throw new AssertionError(`[assert] An invariant was violated :: this method threw but not the expected value${ suffix } :: got ${ e.name }/${ e.message } but did not match the expected ${ expected.name }/${ expected.message }`);
				}
			} else {
				throw new AssertionError(`[assert] An invariant was violated :: this method threw but not the expected value${ suffix } :: got ${ e } and did not know how to compare it to the expected error`);
			}
		}
	}
}


const entity = Object.assign(assert, {
	deepStrictEqual,
	notStrictEqual,
	strictEqual,
	throws,
});

export default entity;
