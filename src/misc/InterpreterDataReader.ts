/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

import { ATN } from "../atn/ATN";
import { Vocabulary } from "../Vocabulary";
import { VocabularyImpl } from "../VocabularyImpl";
import { ATNDeserializer } from "../atn/ATNDeserializer";

function splitToLines(buffer: Buffer): string[] {
	let lines: string[] = [];

	let index = 0;
	while (index < buffer.length) {
		let lineStart = index;
		let lineEndLF = buffer.indexOf("\n".charCodeAt(0), index);
		let lineEndCR = buffer.indexOf("\r".charCodeAt(0), index);
		let lineEnd: number;
		if (lineEndCR >= 0 && (lineEndCR < lineEndLF || lineEndLF === -1)) {
			lineEnd = lineEndCR;
		} else if (lineEndLF >= 0) {
			lineEnd = lineEndLF;
		} else {
			lineEnd = buffer.length;
		}

		lines.push(buffer.toString("utf-8", lineStart, lineEnd));
		if (lineEnd === lineEndCR && lineEnd + 1 === lineEndLF) {
			index = lineEnd + 2;
		} else {
			index = lineEnd + 1;
		}
	}

	return lines;
}

// A class to read plain text interpreter data produced by ANTLR.
export namespace InterpreterDataReader {
	/**
	 * The structure of the data file is very simple. Everything is line based with empty lines
	 * separating the different parts. For lexers the layout is:
	 * token literal names:
	 * ...
	 *
	 * token symbolic names:
	 * ...
	 *
	 * rule names:
	 * ...
	 *
	 * channel names:
	 * ...
	 *
	 * mode names:
	 * ...
	 *
	 * atn:
	 * <a single line with comma separated int values> enclosed in a pair of squared brackets.
	 *
	 * Data for a parser does not contain channel and mode names.
	 */
	export async function parseFile(fileName: string): Promise<InterpreterDataReader.InterpreterData> {
		throw new Error("Failed to read this file, this is a browserified version and therefore reading from disk is not supported");
	}

	export class InterpreterData {
		public atn?: ATN;
		public vocabulary: Vocabulary = VocabularyImpl.EMPTY_VOCABULARY;
		public ruleNames: string[] = [];
		public channels?: string[]; // Only valid for lexer grammars.
		public modes?: string[]; // ditto
	}
}
