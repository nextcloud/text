const regexSpaces = /\s+/g
const regexInvalidCaracters = /[^\p{Letter}\p{Mark}\w\s-]/gu

const slugify = (str) => String(str)
	.toLowerCase()
	.replace(regexInvalidCaracters, '')
	.trim()
	.replace(regexSpaces, '-')

export { slugify }
