/**
 *
 * 提供类似于Javascript 字符串模板（`${}`）的功能。
 * 注意：变量名不能有'{'、'}'这两个字符。且不支持嵌套。大概就是避免脚本注入，又想用这种模板时的简易方式。
 * @export
 * @class Template
 */
export default class Template {
    /**
     *构建一个字符串模板实例
     * @param {string} templateString 要进行转换的字符串。变量名不能有'{'、'}'这两个字符。
     * @param {Map<string, string>} variablesMap 碰到哪些变量名称key时，转换成value
     * @memberof Template
     */
    constructor(templateString: string, variablesMap: Map<string, string>) {
        this._varMap = variablesMap
        this._templateString = templateString
    }
    private _varMap: Map<string, string>
    private _templateString: string

    /**
     *
     * 执行转换。
     * @returns {string}
     * @memberof Template
     */
    public summon(): string {
        let stringReturn = ""
        let waitLeftBracket: boolean = false, inBracket: boolean = false, varName: string = "", varValue: string | undefined = ""
        for (const char of this._templateString) {
            switch (char) {
                case '$':
                    if (inBracket) {
                        varName += "$"
                    } else {
                        if (waitLeftBracket) {
                            waitLeftBracket = false
                            stringReturn += "$$"
                        } else {
                            waitLeftBracket = true
                        }
                    }
                    break;
                case '{':
                    if (waitLeftBracket) {
                        waitLeftBracket = false
                        inBracket = true
                    } else {
                        if (inBracket) {
                            inBracket = false
                            stringReturn += "{" + varName
                            varName = ""
                            //清理varName

                        }
                        stringReturn += "{"
                    }
                    break;
                case '}':
                    if (waitLeftBracket) {
                        waitLeftBracket = false
                        stringReturn += "$}"
                    } else {
                        if (inBracket) {
                            inBracket = false
                            varValue = this._varMap.get(varName)
                            if (varValue) {
                                stringReturn += varValue
                            } else {
                                stringReturn += '${' + varName + '}'
                            }
                            //清理varName
                            varName = ""
                        }
                    }

                    break;
                default:
                    if (waitLeftBracket) {
                        waitLeftBracket = false
                        stringReturn += "$" + char
                    } else {
                        if (inBracket) {
                            varName += char
                        } else {
                            stringReturn += char
                        }
                    }
            }
        }
        //检查varName中是否有剩余
        return stringReturn + (varName ? '${' + varName : "")
    }
}