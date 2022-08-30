
const pad2 = (n: number) => { return n < 10 ? '0' + n : n }

export const timestamp = () => {
    const date = new Date()
    return date.getFullYear().toString() + "-" + pad2(date.getMonth() + 1) + "-" + pad2(date.getDate()) + " " + pad2(date.getHours()) + ":" + pad2(date.getMinutes()) + ":" + pad2(date.getSeconds())
}

export const validString = (val: string, defaultVal: string) => {
    if (val.length == 0) {
        return defaultVal
    }
    return val
}

export const validStrHTMLArray = (val: string, defaultArray: string[]) => {
    if (val.length == 0) {
        return defaultArray
    }

    const arr = val.split(/<\/p>|<\/h1>|<\/h2>|<\/h3>|<\/h4>|<\/h5>|<\/h6>/)

    // add close tag
    for (let i = 0; i < arr.length; i++) {
        const s = arr[i]
        const re = /^(<p>|<h1>|<h2>|<h3>|<h4>|<h5>|<h6>)/
        if (s.match(re)) {
            if (s[2] == '>') {
                arr[i] += "</p>"
            } else if (s[3] == '>') {
                arr[i] += "</" + s.slice(1, 4)
            }
        }
    }

    // filter empty html line
    const rt: string[] = []
    for (let i = 0; i < arr.length; i++) {
        const s = arr[i]
        if (s == "" || s == "<p><br></p>" || s.match(/^<h\d><br><\/h\d>$/g)) {
            continue
        }
        rt.push(s)
    }
    return rt
}

export const validStrTEXTArray = (val: string, defaultArray: string[]) => {
    if (val.length == 0) {
        return defaultArray
    }

    // filter empty text line
    const rt: string[] = []
    val.split("\n").forEach(element => {
        if (element.length > 0) {
            rt.push(element)
        }
    });
    return rt
}