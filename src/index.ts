import type { IMarkOptions } from './typescript/interfaces';
class MarkdownUtil {
	textarea: null | HTMLTextAreaElement | HTMLInputElement;
	constructor(textarea: HTMLTextAreaElement | HTMLInputElement) {
		if (!textarea) throw new ReferenceError('Missing textarea parameter');
		if (!(textarea instanceof HTMLTextAreaElement) && !(textarea instanceof HTMLInputElement)) throw new TypeError('textarea must be HTMLTextAreaElement or HTMLInputElement')
		this.textarea = textarea;
	}
	getSelectionText(): string | null {
		// eslint-disable-next-line
		if (this.textarea) {
			const start = this.textarea.selectionStart;
			const finish = this.textarea.selectionEnd;
			return this.textarea.value.substring(start!, finish!);
		}
		return null;
	};
	addAttributeSelection(options: IMarkOptions) {
		const startSelection = this.textarea?.selectionStart;
		const endSelection = this.textarea?.selectionEnd;
		const splitText = this.textarea?.value.split("");
		if (!splitText?.length) return null
		splitText.forEach((c: string, i: number) => {
			if (i === startSelection && options.attributes.start) splitText[i] = `${options.attributes.start}${c}`;
			if (endSelection && i === endSelection - 1 && options.attributes.end) splitText[i] = `${c}${options.attributes.end}`;
		});
		return splitText.join("");
	};
	addAttributePosition(options: IMarkOptions) {
		console.log(options);

		if (options.positions.start === "current" && options.positions.end === "current") {
			const startSelection = this.textarea!.selectionStart;
			if (!startSelection) return (this.textarea!.value += `${options.attributes.start ? options.attributes.start : ""}${options.attributes.end ? options.attributes.end : ""}`);
			const splitText = this.textarea!.value.split("");
			if (this.textarea!.value.length === startSelection) return this.textarea!.value += `${options.attributes.start}${options.attributes.end}`
			splitText.forEach((c: string, i: number) => {
				if (i === startSelection)
					splitText[i] = `${options.attributes.start ? options.attributes.start : ""}${options.attributes.end ? options.attributes.end : ""}${c}`;
			});
			return splitText.join("");
		}
		if (options.positions.start === "startLine" && options.positions.end === "startLine") {
			const start = this.getCurrentLineStart()
			if (start || start === 0) {
				const splitText = this.textarea!.value.split("");
				splitText.forEach((c: string, i: number) => {
					console.log(`Start : ${start} I : ${i}`);

					if (start == i) splitText[i] = `${options.attributes.start}${c}${options.attributes.end}`
				})
				return splitText.join("")
			}
		}
	};
	checkAndChange(options: IMarkOptions) {
		if (this.getSelectionText()) {
			return { value: this.addAttributeSelection(options) }
		} else {
			return { value: this.addAttributePosition(options) }
		}
	};

	getCurrentLineStart() {
		const pattern = /\r?\n|\r/;
		const caretPos = this.textarea!.selectionStart;
		let lineStartIndx = 0;
		if (caretPos) {
			for (let i = 0; i < caretPos; i++) {
				if (this.textarea!.value.substr(i, 1).match(pattern)) {
					lineStartIndx = i + 1
				}
			}
		}
		return lineStartIndx
	};
	markdown(type: string): void {
		switch (type.toLowerCase()) {
			case "bold":
				this.checkAndChange({
					attributes: {
						start: "**",
						end: "**"
					},
					positions: {
						start: "current",
						end: "current"
					}
				})
				break;
			case "italic":
				this.checkAndChange({
					attributes: {
						start: "*",
						end: "*"
					},
					positions: {
						start: "current",
						end: "current"
					}
				})
				break;
			case "strike":
				this.checkAndChange({
					attributes: {
						start: "<s>",
						end: "</s>"
					},
					positions: {
						start: "current",
						end: "current"
					}
				})
				break;
			case "underline":
				this.checkAndChange({
					attributes: {
						start: "<u>",
						end: "</u>"
					},
					positions: {
						start: "current",
						end: "current"
					}
				})
				break;
			case "h1":
				this.checkAndChange({
					attributes: {
						start: "# ",
						end: ""
					},
					positions: {
						start: "startLine",
						end: "startLine"
					}
				})
				break;
			case "h2":
				this.checkAndChange({
					attributes: {
						start: "## ",
						end: ""
					},
					positions: {
						start: "startLine",
						end: "startLine"
					}
				})
				break;
			case "h3":
				this.checkAndChange({
					attributes: {
						start: "### ",
						end: ""
					},
					positions: {
						start: "startLine",
						end: "startLine"
					}
				})
				break;
			case "quote":
				this.checkAndChange({
					attributes: {
						start: "> ",
						end: ""
					},
					positions: {
						start: "startLine",
						end: "startLine"
					}
				})
				break;
			case "ol":
				this.checkAndChange({
					attributes: {
						start: "1. ",
						end: ""
					},
					positions: {
						start: "startLine",
						end: "startLine"
					}
				})
				break;
			case "ul":
				this.checkAndChange({
					attributes: {
						start: "*",
						end: ""
					},
					positions: {
						start: "startLine",
						end: "startLine"
					}
				})
				break;
			case "link":
				this.checkAndChange({
					attributes: {
						start: " [",
						end: "]()"
					},
					positions: {
						start: "current",
						end: "current"
					}
				})
				break;
			case "image":
				this.checkAndChange({
					attributes: {
						start: " ![",
						end: "]()"
					},
					positions: {
						start: "current",
						end: "current"
					}
				})
				break;
		};
	}
}