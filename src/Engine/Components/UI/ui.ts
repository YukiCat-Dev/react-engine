export interface RGBColor extends TriParamColor {
    r: number,
    g: number,
    b: number
}
export interface HSLColor extends TriParamColor {
    h: number,
    s: number,
    l: number
}
export interface TriParamColor {

}
export class ColorUtil {
    static transRGBToHSL(rgb: RGBColor) {
        //http://wsyks.github.io/2017/03/17/JS%E5%AE%9E%E7%8E%B0RGB-HSL-HSB%E7%9B%B8%E4%BA%92%E8%BD%AC%E6%8D%A2/
        //TODO:finish it
        let hsl: HSLColor =
        {
            h: 0//单位 角度 0-360
            , s: 0//0-1
            , l: 0//0-1
        }
        let rgbArray: Array<[string, number]> = Object.entries(rgb)
        rgbArray.map((v) => { return [v[0], v[1] / 255] })//convert from 0~255→0~1
        rgbArray.sort((a, b) => {
            return a[1] - b[1]
        })
        // min=rgbArray[0],max=rgbArray[2]
        //caculate h
        if (rgbArray[0][1] == rgbArray[2][1]) {
            hsl.h = 0
        } else if (rgbArray[2][0] == 'r') {
            hsl.h = 60 * (rgb.g - rgb.b) / (rgbArray[2][1] = rgbArray[0][1]) + rgb.g < rgb.b ? 360 : 0
        } else if (rgbArray[2][0] == 'g') {
            hsl.h = 60 * (rgb.b - rgb.r) / (rgbArray[2][1] = rgbArray[0][1]) + 120
        } else if (rgbArray[2][0] == 'b') {
            hsl.h = 60 * (rgb.r - rgb.g) / (rgbArray[2][1] = rgbArray[0][1]) + 240
        }
        //caculate l
        hsl.l = (rgbArray[0][1] + rgbArray[2][1]) / 2
        //caculate s
        if ((hsl.l == 0) || (hsl.h == 0)) {
            hsl.s = 0
        } else if (hsl.l > 0 && hsl.l <= 0.5) {
            hsl.s = (rgbArray[2][1] - rgbArray[0][1]) / 2 * hsl.l
        } else if (hsl.l > 0.5) {
            hsl.s = (rgbArray[2][1] - rgbArray[0][1]) / (2 - 2 * hsl.l)
        }

    }

    static toCSSRule(color: TriParamColor): string {
        if (color['r'] != undefined) {//RGBColor
            return `rgb(${color['r']},${color['g']},${color['b']})`
        } else if (color['h'] != undefined) {//HSL 
            return `hsl(${color['h']},${color['s']},${color['l']})`
        } else {
            return ""
        }
    }
}