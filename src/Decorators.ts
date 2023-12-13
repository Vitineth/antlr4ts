/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

type ApplicableContexts = ClassMethodDecoratorContext | ClassFieldDecoratorContext | ClassGetterDecoratorContext;

export function Nullable(
	target: any,
	propertyKey?: ApplicableContexts) {
	// intentionally empty
}

export function Override(
	target: any,
	propertyKey?: ApplicableContexts) {
	// do something with 'target' ...
}

export function SuppressWarnings(options: string) {
	return (target: any, propertyKey?: ApplicableContexts, descriptor?: PropertyDescriptor) => {
		// intentionally empty
	};
}
