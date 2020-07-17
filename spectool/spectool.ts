/*
Usage:
    tsc tools/spectool.ts && node tools/spectool.js services/
Files are written in services/generated
*/

type SMap<T> = { [v: string]: T; }

type StorageType = "i8" | "u8" | "i16" | "u16" | "i32" | "u32" | "i64" | "u64" | "bytes"
type Unit = "" | "frac" | "s" | "ms" | "us" | "mV" | "mA" | "mWh"

interface ServiceInfo {
    name: string;
    notes: SMap<string>;
    classIdentifier: number;
    extends: string[];
    enums: SMap<EnumInfo>;
    interfaces: SMap<InterfaceInfo>;
    errors?: Diagnostic[]; // possible parse errors
}

interface EnumInfo {
    name: string;
    storage: StorageType;
    members: SMap<number>;
}

type InterfaceKind = "report" | "command" | "ro" | "rw" | "event"

interface InterfaceInfo {
    kind: InterfaceKind;
    name: string;
    identifier: number; // register/command/event number
    description: string; // this can get long
    hasNaturalAlignment: boolean;
    isOptional: boolean;
    fields: InterfaceMember[]; // most registers have a single member, named "_"
}

interface InterfaceMember {
    name: string;
    type: string; // this can be enum name
    unit: Unit;
    storage: StorageType;
    defaultValue?: number;
}

interface Diagnostic {
    file: string;
    line: number;
    message: string;
}

function toJSON(filecontent: string, includes?: SMap<ServiceInfo>, filename = ""): ServiceInfo {
    let info: ServiceInfo = {
        name: "",
        extends: [],
        notes: {},
        classIdentifier: 0,
        enums: {},
        interfaces: {},
    }

    let backticksType = ""
    let enumObject: EnumInfo = null
    let interfaceObject: InterfaceInfo = null
    let errors: Diagnostic[] = []
    let lineNo = 0
    let noteId = "short"
    let lastCmd: InterfaceInfo

    const baseInfo = includes ? includes["_base"] : undefined

    try {
        for (let line of filecontent.split(/\n/)) {
            lineNo++
            processLine(line)
        }
    } catch (e) {
        error("exception: " + e.message)
    }

    if (errors.length)
        info.errors = errors
    return info

    function processLine(line: string) {
        if (backticksType) {
            if (line.trim() == "```") {
                backticksType = null
                if (backticksType == "default")
                    return
            }
        } else {
            const m = /^```(.*)/.exec(line)
            if (m) {
                backticksType = m[1] || "default"
                if (backticksType == "default")
                    return
            }
        }

        const interpret = backticksType == "default" || line.slice(0, 4) == "    "

        if (!interpret) {
            const m = /^(#+)\s*(.*)/.exec(line)
            if (m) {
                let [hd, cont] = m
                cont = cont.trim()
                const newNoteId = cont.toLowerCase()
                if (hd == "#" && !info.name) {
                    info.name = cont
                    line = ""
                } else if (newNoteId == "registers" || newNoteId == "commands" || newNoteId == "events" || newNoteId == "examples") {
                    noteId = newNoteId
                    line = ""
                } else {
                    if (noteId == "short")
                        noteId = "long"
                    // keep line
                }
            }

            if (line || info.notes[noteId]) {
                if (!info.notes[noteId])
                    info.notes[noteId] = ""
                info.notes[noteId] += line + "\n"
            }
        } else {
            const expanded = line
                .replace(/\/\/.*/, "")
                .replace(/[\?@:=,\{\};]/g, s => " " + s + " ")
                .trim()
            if (!expanded)
                return
            const words = expanded.split(/\s+/)
            if (/^[;,]/.test(words[words.length - 1]))
                words.pop()
            let cmd = words[0]
            // allow for `command = Foo.Bar` etc (ie. command is not a keyword there)
            if (words[1] == ":" || words[1] == "=")
                cmd = ":"
            switch (cmd) {
                case "enum":
                    startEnum(words)
                    break
                case "report":
                case "command":
                case "ro":
                case "rw":
                case "event":
                    startInterface(words)
                    break
                case "}":
                    if (interfaceObject) {
                        finishInterface()
                    } else if (enumObject) {
                        enumObject = null
                    } else {
                        error("nothing to end here")
                    }
                    break
                default:
                    if (interfaceObject) interfaceMember(words)
                    else if (enumObject) enumMember(words)
                    else metadataMember(words)
            }
        }
    }

    function finishInterface() {
        interfaceObject.hasNaturalAlignment = hasNaturalAlignment(interfaceObject)
        interfaceObject = null
    }

    function checkBraces(words: string[]) {
        if (enumObject || interfaceObject)
            error("already in braces")
        if (words) {
            if (words[2] != "{")
                error(`expecting: ${words[0]} NAME {`)
        }

        enumObject = null
        interfaceObject = null
    }

    function startInterface(words: string[]) {
        checkBraces(null)
        const kind = words.shift() as any as InterfaceKind
        let name = words.shift()
        const isResp = kind == "report"
        if (isResp && lastCmd && !/^\w+$/.test(name)) {
            words.unshift(name)
            name = lastCmd.name
        }
        interfaceObject = {
            kind,
            name: normalizeName(name),
            identifier: undefined,
            description: "",
            isOptional: false,
            hasNaturalAlignment: false,
            fields: []
        }
        if (words[0] == "?") {
            words.shift()
            interfaceObject.isOptional = true
        }

        const key = isResp ? "resp:" + interfaceObject.name : interfaceObject.name
        if (info.interfaces[key])
            error("interface redefinition")

        const atat = words.indexOf("@")
        if (atat >= 0) {
            const w = words[atat + 1]
            let v = parseInt(w)
            if (isNaN(v)) {
                v = 0
                if (baseInfo) {
                    const baseIntf = baseInfo.interfaces[w]
                    if (baseIntf) {
                        v = baseIntf.identifier
                        if (baseIntf.kind != kind)
                            error(`kind mismatch on ${w}: ${baseIntf} vs {kind}`)
                    } else
                        error(`${w} not found in _base`)
                } else {
                    error(`${w} cannot be resolved, since _base is missing`)
                }
            }
            interfaceObject.identifier = v
            words.splice(atat, 2)
        } else {
            if (isResp && lastCmd)
                interfaceObject.identifier = lastCmd.identifier
            else
                error(`@ not found at ${interfaceObject.name}`)
        }

        info.interfaces[interfaceObject.name] = interfaceObject

        if (kind == "command")
            lastCmd = interfaceObject
        else
            lastCmd = null

        if (words[0] == "=" || words[0] == ":") {
            if (words.indexOf("{") >= 0)
                error("member need to use either block or inline syntax, not both")
            words.unshift("_")
            interfaceMember(words)
            finishInterface()
        } else {
            const last = words.shift()
            if (last == "{") {
                if (words[0] == "...")
                    words.shift()
                if (words[0] == "}") {
                    words.shift()
                    finishInterface()
                }
                if (words.length)
                    error(`excessive tokens: ${words[0]}...`)
            } else {
                if (last === undefined && kind == "event") {
                    finishInterface()
                } else {
                    error("expecting '{'")
                }
            }
        }
    }

    function interfaceMember(words: string[]) {
        const name = normalizeName(words.shift())
        let defaultValue: number = undefined
        let op = words.shift()
        if (op == "=") {
            defaultValue = parseIntCheck(words.shift())
            op = words.shift()
        }

        if (op != ":")
            error("expecting ':'")

        let tp = normalizeType(words.shift())

        let unit = normalizeUnit(words.shift())

        if (words.length)
            error(`excessive tokens at the end of member: ${words[0]}...`)

        interfaceObject.fields.push({
            name,
            unit,
            type: normalizeType(tp),
            storage: storageTypeFor(tp),
            defaultValue,
        })
    }

    function startEnum(words: string[]) {
        checkBraces(null)
        if (words[2] != ":" || words[4] != "{")
            error("expecting: enum NAME : TYPE {")
        enumObject = {
            name: normalizeName(words[1]),
            storage: normalizeStorageType(words[3]),
            members: {}
        }
        if (info.enums[enumObject.name])
            error("enum redefinition")
        info.enums[enumObject.name] = enumObject
    }


    function enumMember(words: string[]) {
        if (words[1] != "=" || words.length != 3)
            error(`expecting: FILD_NAME = INTEGER`)
        enumObject.members[normalizeName(words[0])] = parseIntCheck(words[2])
    }

    function parseIntCheck(w: string) {
        const v = parseInt(w)
        if (isNaN(v)) {
            const ww = w.split(/\./)
            if (ww.length != 2) {
                error(`expecting int or enum member here`)
                return 0
            }
            const en = info.enums[ww[0]]
            if (!en) {
                error(`${ww[0]} is not an enum type`)
                return 0
            }
            if (!en.members.hasOwnProperty(ww[1]))
                error(`${ww[1]} is not a member of ${ww[0]}`)
            return en.members[ww[1]] || 0
        }
        return v
    }

    function metadataMember(words: string[]) {
        if ((words[1] != "=" && words[1] != ":") || words.length != 3)
            error(`expecting: FILD_NAME = VALUE or FIELD_NAME : VALUE`)
        switch (words[0]) {
            case "extends":
                processInclude(words[2])
                break
            case "class":
            case "identifier":
                info.classIdentifier = parseIntCheck(words[2])
                break
            default:
                error("unknown metadata field: " + words[0])
                break
        }
    }

    function processInclude(name: string) {
        if (name == "base")
            return
        const inner = includes["_" + name]
        if (!inner)
            return error("include file not found: " + name)
        if (Object.keys(info.interfaces).length || Object.keys(info.enums).length)
            error("extends: only allowed on top")
        if (inner.errors)
            errors = errors.concat(inner.errors)
        info.enums = clone(inner.enums)
        info.interfaces = clone(inner.interfaces)
    }

    function clone<T>(v: T): T {
        return JSON.parse(JSON.stringify(v))
    }

    function error(msg: string) {
        if (!msg) msg = "syntax error"
        if (errors.some(e => e.line == lineNo && e.message == msg))
            return
        errors.push({ file: filename, line: lineNo, message: msg })
    }

    function normalizeName(n: string) {
        if (!/^\w+$/.test(n))
            error("expecting name here")
        return n
    }

    function normalizeStorageType(tp: string): StorageType {
        if (!tp)
            error("expecting type here")
        let tp2 = tp.replace(/_t$/, "").toLowerCase()
        switch (tp2) {
            case "bool":
                return "u8"
            case "i8":
            case "u8":
            case "i16":
            case "u16":
            case "i32":
            case "u32":
            case "i64":
            case "u64":
            case "bytes":
                return tp2
            case "utf8":
            case "string":
            case "i32[]":
                return "bytes"
            default:
                error("unknown type: " + tp)
                return "u32"
        }
    }

    function normalizeType(tp: string) {
        if (info.enums[tp])
            return tp
        return normalizeStorageType(tp)
    }

    function normalizeUnit(unit: string): Unit {
        switch (unit) {
            case undefined:
            case null:
                return ""
            case "":
            case "frac":
            case "s":
            case "ms":
            case "us":
            case "mV":
            case "mA":
            case "mWh":
                return unit
            default:
                error(`expecting unit, got '${unit}'`)
                return ""
        }
    }

    function storageTypeFor(tp: string) {
        const norm = normalizeType(tp)
        if (info.enums[norm])
            return info.enums[norm].storage
        return normalizeStorageType(norm)
    }

    function hasNaturalAlignment(iface: InterfaceInfo) {
        let bitOffset = 0

        for (let m of iface.fields) {
            let sz = bitSize(m.storage)
            if (sz == 0)
                continue
            if (bitOffset % sz != 0)
                return false
            bitOffset += sz
        }

        return true
    }
}

function values<T>(o: SMap<T>): T[] {
    let r: T[] = []
    for (let k of Object.keys(o))
        r.push(o[k])
    return r
}

function fail(msg: string) {
    throw new Error(msg)
}

function bitSize(tp: StorageType) {
    const m = /^[iu](\d+)/.exec(tp)
    if (m) {
        return parseInt(m[1])
    }
    if (tp == "bytes")
        return 0
    fail("cannot determine size of " + tp)
    return 0
}

function toUpper(name: string) {
    return name.replace(/([a-z])([A-Z])/g, (x, a, b) => a + "_" + b).toUpperCase()
}

function packed(iface: InterfaceInfo) {
    if (iface.hasNaturalAlignment) return ""
    else return " __attribute__((packed))"
}

function toH(info: ServiceInfo) {
    let r = "// Autogenerated C header file for " + info.name + "\n"
    const hdDef = `_JACDAC_${toUpper(info.name)}_H`
    r += `#ifndef ${hdDef}\n`
    r += `#define ${hdDef} 1\n`
    for (let en of values(info.enums)) {
        const enPref = toUpper(en.name)
        r += `\n// enum ${en.name} (${en.storage}_t)\n`
        for (let k of Object.keys(en.members))
            r += "#define " + enPref + "_" + toUpper(k) + " " + en.members[k] + "\n"
    }
    for (let iface of values(info.interfaces)) {
        r += `\n// ${iface.kind} ${iface.name}\n`
        r += `typedef struct ${iface.name} {\n`
        for (let f of iface.fields) {
            let def = ""
            if (f.storage == "bytes") {
                def = `char ${f.name}[0]`
            } else {
                def = `${f.storage}_t ${f.name}`
            }
            def += ";"
            if (f.storage != f.type)
                def += "  // " + f.type
            r += "    " + def + "\n"
        }
        r += `}${packed(iface)} ${iface.name};\n`
    }
    r += "\n#endif\n"
    return r
}

function toHPP(info: ServiceInfo) {
    let r = "// Autogenerated C++ header file for " + info.name + "\n"
    const hdDef = `_JACDAC_${toUpper(info.name)}_HPP`
    r += `#ifndef ${hdDef}\n`
    r += `#define ${hdDef} 1\n`
    for (let en of values(info.enums)) {
        r += `\nenum class ${en.name} : ${en.storage}_t {\n`
        for (let k of Object.keys(en.members))
            r += "    " + k + " = " + en.members[k] + ",\n"
        r += "}\n"
    }
    for (let iface of values(info.interfaces)) {
        r += `\n// ${iface.kind} ${iface.name}\n`
        r += `struct ${iface.name} {\n`
        for (let f of iface.fields) {
            let def = ""
            if (f.storage == "bytes") {
                def = `char ${f.name}[0]`
            } else {
                if (f.storage != f.type)
                    def = `${f.type} ${f.name}`
                else
                    def = `${f.storage}_t ${f.name}`
            }
            def += ";"
            r += "    " + def + "\n"
        }
        r += `}${packed(iface)};\n`
    }
    r += "\n#endif\n"
    return r
}

const tsNumFmt = {
    u8: "UInt8LE:B",
    u16: "UInt16LE:H",
    u32: "UInt32LE:L",
    i8: "Int8LE:b",
    i16: "Int16LE:h",
    i32: "Int32LE:l",
}

function toTS(info: ServiceInfo) {
    let r = "// Autogenerated TypeScript file for " + info.name + "\n"
    r += "namespace " + info.name + " {\n"
    for (let en of values(info.enums)) {
        r += `\nexport enum ${en.name} {\n`
        for (let k of Object.keys(en.members))
            r += "    " + k + " = " + en.members[k] + ",\n"
        r += "}\n"
    }
    for (let iface of values(info.interfaces)) {
        r += `\n// ${iface.kind} ${iface.name}\n`
        r += `export class ${iface.name} {\n`
        let offset = 0
        let stringMem = ""
        let fmtstring = "<"
        let intMems: string[] = []
        for (let f of iface.fields) {
            let getter = ""
            let setter = ""
            if (f.storage == "bytes") {
                stringMem = f.name
                getter = `this._data.slice(${offset}).toString()`
            } else {
                intMems.push(f.name)
                let numf = tsNumFmt[f.storage]
                if (!numf)
                    fail("unknown storage type: " + f.storage)
                const [nn, py] = numf.split(":")
                fmtstring += py
                numf = "NumberFormat." + nn
                getter = `this._data.getNumber(${numf}, ${offset})`
                if (f.storage != f.type)
                    getter += " as " + f.type
                setter = `this._data.setNumber(${numf}, ${offset}, v)`
            }
            if (getter)
                r += `    get ${f.name}(): ${f.type} { return ${getter} }\n`
            if (setter)
                r += `    set ${f.name}(v: ${f.type}) { ${setter} }\n`
            offset += (bitSize(f.storage) + 7) >> 3
        }
        r += `    get byteSize() { return ${offset} }\n`
        r += `    constructor(public _data${stringMem ? "" : "?"}: Buffer) {\n`
        if (!stringMem)
            r += `         if (!this._data) this._data = control.createBuffer(${offset})\n`
        r += `    }\n`
        r += `}\n`

        r += `/* ALT option:\n`
        r += `const [${intMems.join(", ")}] = pins.unpackBuffer("${fmtstring}", buf)\n`
        if (stringMem)
            r += `const ${stringMem} = buf.slice(${offset})\n`
        r += `*/\n`
    }
    r += "\n} // end namespace\n"
    return r
}

declare var process: any;
declare var require: any;

function converters(): SMap<(s: ServiceInfo) => string> {
    return {
        "json": (j: ServiceInfo) => JSON.stringify(j, null, 2),
        /*
        "ts": toTS,
        "c": toH,
        "cpp": toHPP,
        */
    }
}

function nodeMain() {
    const fs = require("fs")
    const path = require("path")
    if (process.argv.length != 3) {
        console.error("usage: node spectool.js DIRECTORY")
        process.exit(1)
    }

    const dn = process.argv[2]
    console.log("processing diretory " + dn + "...")
    const files: string[] = fs.readdirSync(dn)
    const includes: SMap<ServiceInfo> = {}
    files.sort()

    const outp = path.join(dn, "generated")
    mkdir(outp)
    for (let n of Object.keys(converters()))
        mkdir(path.join(outp, n))

    for (let fn of files) {
        if (!/\.md$/.test(fn) || fn[0] == ".")
            continue
        console.log(`process ${fn}`)
        const cont: string = fs.readFileSync(path.join(dn, fn), "utf8")
        const json = toJSON(cont, includes)
        if (fn[0] == "_")
            includes[fn.replace(/\.md$/, "")] = json

        if (json.errors) {
            for (let e of json.errors) {
                const fn2 = e.file ? path.join(dn, e.file + ".md") : fn
                console.error(`${fn2}(${e.line}): ${e.message}`)
            }
            break
        } else {
            const cnv = converters()
            for (let n of Object.keys(cnv)) {
                fs.writeFileSync(path.join(outp, n, json.name + "." + n), cnv[n](json))
            }
        }
    }

    function mkdir(n: string) {
        try {
            fs.mkdirSync(n, "777")
        } catch { }
    }
}

if (typeof process != "undefined")
    nodeMain();
