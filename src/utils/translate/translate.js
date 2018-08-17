import dict from './lang/en.js'

export default function translate(text) {
    if (typeof(dict[text])!=='undefined' && dict[text]) {
        return dict[text]
    } else {
        return text
    }
}