import "@testing-library/jest-native/extend-expect";

global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

// Minimal polyfills for browser streaming APIs used by some Expo modules during tests
if (typeof global.TransformStream === "undefined") {
	// very small stub: only provide readable/writable placeholders used by expo internals
	// not a real implementation, just enough to avoid runtime errors in tests
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	global.TransformStream = class TransformStream {
		constructor() {
			this.readable = {};
			this.writable = {};
		}
	};
}

if (typeof global.TextDecoderStream === "undefined") {
	// TextDecoderStream relies on TransformStream; provide a minimal stub
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	global.TextDecoderStream = class TextDecoderStream {
		constructor() {
			this.readable = {};
			this.writable = {};
		}
	};
}
