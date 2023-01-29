/**
 * Written by ChatGPT on 01/26/2023
 * Edited by Andrew Li, Northwestern Class of 2026
 * static colors from https://www.w3.org/wiki/CSS/Properties/color/keywords
 */

export class Color {
  private _r: number;
  private _g: number;
  private _b: number;
  private _a: number;
  private _name: string;

  /**
   *
   * @param r : Red value between 0 and 255
   * @param g : Green value between 0 and 255
   * @param b : Blue value between 0 and 255
   * @param alpha : Alpha value between 0 and 1
   * @param name : String name of the color, or hex code if not given
   */
  constructor(r: number, g: number, b: number, alpha = 1, name?: string) {
    const isValidColor =
      r <= 255 &&
      r >= 0 &&
      g <= 255 &&
      g >= 0 &&
      b <= 255 &&
      b >= 0 &&
      alpha >= 0 &&
      alpha <= 1;
    if (!isValidColor) {
      throw new Error("Invalid color");
    }

    this._r = r;
    this._g = g;
    this._b = b;
    this._a = alpha;

    if (name) {
      this._name = name;
    } else {
      this._name =
        "#" +
        r.toString(16).padStart(2, "0") +
        g.toString(16).padStart(2, "0") +
        b.toString(16).padStart(2, "0");
    }
  }

  // toString functions

  /**
   * @returns : Returns RGBA color string usable in CSS
   */
  toRGBAString(): string {
    return `rgba(${this._r}, ${this._g}, ${this._b}, ${this._a})`;
  }

  /**
   * @returns : Returns CMYK color string usable in CSS
   */
  toCMYKString(): string {
    let c = 1 - this._r / 255;
    let m = 1 - this._g / 255;
    let y = 1 - this._b / 255;
    const k = Math.min(c, Math.min(m, y));
    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);
    return `cmyk(${c * 100}%, ${m * 100}%, ${y * 100}%, ${k * 100}%)`;
  }

  /**
   * @returns Returns hex code of color
   */
  toHexCode(): string {
    return this._name;
  }

  /**
   * @returns : Color object from hex code
   */
  static fromHex(color: string): Color {
    if (color[0] === "#") {
      color = color.slice(1);
    }

    let r, g, b, a;
    if (color.length === 3) {
      [r, g, b] = color.split("").map((c) => parseInt(c + c, 16));
      a = 1;
    } else if (color.length === 6) {
      const colorMatch = color.match(/.{2}/g);

      if (!colorMatch) {
        throw new Error("Invalid color format");
      }

      [r, g, b] = colorMatch.map((c) => parseInt(c, 16));
      a = 1;
    } else if (color.length === 8) {
      const colorMatch = color.match(/.{2}/g);

      if (!colorMatch) {
        throw new Error("Invalid color format");
      }

      [r, g, b, a] = colorMatch.map((c) => parseInt(c, 16));
      a /= 255;
    } else {
      throw new Error("Invalid color format");
    }

    const isValidColor =
      r <= 255 &&
      r >= 0 &&
      g <= 255 &&
      g >= 0 &&
      b <= 255 &&
      b >= 0 &&
      a >= 0 &&
      a <= 1;
    if (!isValidColor) {
      throw new Error("Invalid color");
    }

    return new Color(r, g, b, a, color);
  }

  // Static CSS colors which take alpha and return a Color object

  static Silver(alpha = 1): Color {
    return new Color(192, 192, 192, alpha, "silver");
  }

  static Gray(alpha = 1): Color {
    return new Color(128, 128, 128, alpha, "gray");
  }

  static White(alpha = 1): Color {
    return new Color(255, 255, 255, alpha, "white");
  }

  static Maroon(alpha = 1): Color {
    return new Color(128, 0, 0, alpha, "maroon");
  }

  static Red(alpha = 1): Color {
    return new Color(255, 0, 0, alpha, "red");
  }

  static Purple(alpha = 1): Color {
    return new Color(128, 0, 128, alpha, "purple");
  }

  static Fuchsia(alpha = 1): Color {
    return new Color(255, 0, 255, alpha, "fuchsia");
  }

  static Green(alpha = 1): Color {
    return new Color(0, 128, 0, alpha, "green");
  }

  static Lime(alpha = 1): Color {
    return new Color(0, 255, 0, alpha, "lime");
  }

  static Olive(alpha = 1): Color {
    return new Color(128, 128, 0, alpha, "olive");
  }

  static Yellow(alpha = 1): Color {
    return new Color(255, 255, 0, alpha, "yellow");
  }

  static Navy(alpha = 1): Color {
    return new Color(0, 0, 128, alpha, "navy");
  }

  static Blue(alpha = 1): Color {
    return new Color(0, 0, 255, alpha, "blue");
  }

  static Teal(alpha = 1): Color {
    return new Color(0, 128, 128, alpha, "teal");
  }

  static AliceBlue(alpha = 1) {
    return new Color(240, 248, 255, alpha, "aliceblue");
  }

  static AntiqueWhite(alpha = 1) {
    return new Color(250, 235, 215, alpha, "antiquewhite");
  }
  
  static Aqua(alpha = 1) {
    return new Color(0, 255, 255, alpha, "aqua");
  }
  
  static Aquamarine(alpha = 1) {
    return new Color(127, 255, 212, alpha, "aquamarine");
  }
  
  static Azure(alpha = 1) {
    return new Color(240, 255, 255, alpha, "azure");
  }
  
  static Beige(alpha = 1) {
    return new Color(245, 245, 220, alpha, "beige");
  }
  
  static Bisque(alpha = 1) {
    return new Color(255, 228, 196, alpha, "bisque");
  }
  
  static Black(alpha = 1) {
    return new Color(0, 0, 0, alpha, "black");
  }
  
  static BlanchedAlmond(alpha = 1) {
    return new Color(255, 235, 205, alpha, "blanchedalmond");
  }
  
  static BlueViolet(alpha = 1) {
    return new Color(138, 43, 226, alpha, "blueviolet");
  }
  
  static Brown(alpha = 1) {
    return new Color(165, 42, 42, alpha, "brown");
  }
  
  static Burlywood(alpha = 1) {
    return new Color(222, 184, 135, alpha, "burlywood");
  }
  
  static CadetBlue(alpha = 1) {
    return new Color(95, 158, 160, alpha, "cadetblue");
  }
  
  static Chartreuse(alpha = 1) {
    return new Color(127, 255, 0, alpha, "chartreuse");
  }
  
  static Chocolate(alpha = 1) {
    return new Color(210, 105, 30, alpha, "chocolate");
  }
  
  static Coral(alpha = 1) {
    return new Color(255, 127, 80, alpha, "coral");
  }
  
  static CornflowerBlue(alpha = 1) {
    return new Color(100, 149, 237, alpha, "cornflowerblue");
  }
  
  static Cornsilk(alpha = 1) {
    return new Color(255, 248, 220, alpha, "cornsilk");
  }
  
  static Crimson(alpha = 1) {
    return new Color(220, 20, 60, alpha, "crimson");
  }
  
  static Cyan(alpha = 1) {
    return new Color(0, 255, 255, alpha, "cyan");
  }
  
  static DarkBlue(alpha = 1) {
    return new Color(0, 0, 139, alpha, "darkblue");
  }
  
  static DarkCyan(alpha = 1) {
    return new Color(0, 139, 139, alpha, "darkcyan");
  }
  
  static DarkGoldenrod(alpha = 1) {
    return new Color(184, 134, 11, alpha, "darkgoldenrod");
  }
  
  static DarkGray(alpha = 1) {
    return new Color(169, 169, 169, alpha, "darkgray");
  }
  
  static DarkGreen(alpha = 1) {
    return new Color(0, 100, 0, alpha, "darkgreen");
  }
  
  static DarkGrey(alpha = 1) {
    return new Color(169, 169, 169, alpha, "darkgrey");
  }
  
  static Darkkhaki(alpha = 1) {
    return new Color(189, 183, 107, alpha, "darkkhaki");
  }
  
  static DarkMagenta(alpha = 1) {
    return new Color(139, 0, 139, alpha, "darkmagenta");
  }
  
  static DarkOliveGreen(alpha = 1) {
    return new Color(85, 107, 47, alpha, "darkolivegreen");
  }
  
  static DarkOrange(alpha = 1) {
    return new Color(255, 140, 0, alpha, "darkorange");
  }
  
  static DarkOrchid(alpha = 1) {
    return new Color(153, 50, 204, alpha, "darkorchid");
  }
  
  static DarkRed(alpha = 1) {
    return new Color(139, 0, 0, alpha, "darkred");
  }

  static DarkSalmon(alpha = 1) {
    return new Color(233, 150, 122, alpha, "darksalmon");
  }

  static DarkSeaGreen(alpha = 1) {
    return new Color(143, 188, 143, alpha, "darkseagreen");
  }

  static DarkSlateBlue(alpha = 1) {
    return new Color(72, 61, 139, alpha, "darkslateblue");
  }

  static DarkSlateGray(alpha = 1) {
    return new Color(47, 79, 79, alpha, "darkslategray");
  }

  static DarkSlateGrey(alpha = 1) {
    return new Color(47, 79, 79, alpha, "darkslategrey");
  }

  static DarkTurquoise(alpha = 1) {
    return new Color(0, 206, 209, alpha, "darkturquoise");
  }

  static DarkViolet(alpha = 1) {
    return new Color(148, 0, 211, alpha, "darkviolet");
  }

  static DeepPink(alpha = 1) {
    return new Color(255, 20, 147, alpha, "deeppink");
  }

  static DeepSkyBlue(alpha = 1) {
    return new Color(0, 191, 255, alpha, "deepskyblue");
  }

  static DimGray(alpha = 1) {
    return new Color(105, 105, 105, alpha, "dimgray");
  }

  static DimGrey(alpha = 1) {
    return new Color(105, 105, 105, alpha, "dimgrey");
  }

  static DodgerBlue(alpha = 1) {
    return new Color(30, 144, 255, alpha, "dodgerblue");
  }

  static Firebrick(alpha = 1) {
    return new Color(178, 34, 34, alpha, "firebrick");
  }

  static FloralWhite(alpha = 1) {
    return new Color(255, 250, 240, alpha, "floralwhite");
  }

  static ForestGreen(alpha = 1) {
    return new Color(34, 139, 34, alpha, "forestgreen");
  }

  static Gainsboro(alpha = 1) {
    return new Color(220, 220, 220, alpha, "gainsboro");
  }

  static GhostWhite(alpha = 1) {
    return new Color(248, 248, 255, alpha, "ghostwhite");
  }

  static Gold(alpha = 1) {
    return new Color(255, 215, 0, alpha, "gold");
  }

  static Goldenrod(alpha = 1) {
    return new Color(218, 165, 32, alpha, "goldenrod");
  }

  static GreenYellow(alpha = 1) {
    return new Color(173, 255, 47, alpha, "greenyellow");
  }

  static Grey(alpha = 1) {
    return new Color(128, 128, 128, alpha, "grey");
  }

  static Honeydew(alpha = 1) {
    return new Color(240, 255, 240, alpha, "honeydew");
  }

  static HotPink(alpha = 1) {
    return new Color(255, 105, 180, alpha, "hotpink");
  }

  static IndianRed(alpha = 1) {
    return new Color(205, 92, 92, alpha, "indianred");
  }

  static Indigo(alpha = 1) {
    return new Color(75, 0, 130, alpha, "indigo");
  }

  static Ivory(alpha = 1) {
    return new Color(255, 255, 240, alpha, "ivory");
  }

  static Khaki(alpha = 1) {
    return new Color(240, 230, 140, alpha, "khaki");
  }

  static Lavender(alpha = 1) {
    return new Color(230, 230, 250, alpha, "lavender");
  }

  static LavenderBlush(alpha = 1) {
    return new Color(255, 240, 245, alpha, "lavenderblush");
  }

  static LawnGreen(alpha = 1) {
    return new Color(124, 252, 0, alpha, "lawngreen");
  }

  static LemonChiffon(alpha = 1) {
    return new Color(255, 250, 205, alpha, "lemonchiffon");
  }

  static LightBlue(alpha = 1) {
    return new Color(173, 216, 230, alpha, "lightblue");
  }

  static LightCoral(alpha = 1) {
    return new Color(240, 128, 128, alpha, "lightcoral");
  }

  static LightCyan(alpha = 1) {
    return new Color(224, 255, 255, alpha, "lightcyan");
  }

  static LightGoldenrodYellow(alpha = 1) {
    return new Color(250, 250, 210, alpha, "lightgoldenrodyellow");
  }

  static LightGray(alpha = 1) {
    return new Color(211, 211, 211, alpha, "lightgray");
  }

  static LightGreen(alpha = 1) {
    return new Color(144, 238, 144, alpha, "lightgreen");
  }

  static LightGrey(alpha = 1) {
    return new Color(211, 211, 211, alpha, "lightgrey");
  }

  static LightPink(alpha = 1) {
    return new Color(255, 182, 193, alpha, "lightpink");
  }

  static LightSalmon(alpha = 1) {
    return new Color(255, 160, 122, alpha, "lightsalmon");
  }

  static LightSeaGreen(alpha = 1) {
    return new Color(32, 178, 170, alpha, "lightseagreen");
  }

  static LightSkyBlue(alpha = 1) {
    return new Color(135, 206, 250, alpha, "lightskyblue");
  }

  static LightSlateGray(alpha = 1) {
    return new Color(119, 136, 153, alpha, "lightslategray");
  }

  static LightSlateGrey(alpha = 1) {
    return new Color(119, 136, 153, alpha, "lightslategrey");
  }

  static LightSteelBlue(alpha = 1) {
    return new Color(176, 196, 222, alpha, "lightsteelblue");
  }

  static LightYellow(alpha = 1) {
    return new Color(255, 255, 224, alpha, "lightyellow");
  }

  static LimeGreen(alpha = 1) {
    return new Color(50, 205, 50, alpha, "limegreen");
  }

  static Linen(alpha = 1) {
    return new Color(250, 240, 230, alpha, "linen");
  }

  static Magenta(alpha = 1) {
    return new Color(255, 0, 255, alpha, "magenta");
  }

  static MediumAquamarine(alpha = 1) {
    return new Color(102, 205, 170, alpha, "mediumaquamarine");
  }

  static MediumBlue(alpha = 1) {
    return new Color(0, 0, 205, alpha, "mediumblue");
  }

  static MediumOrchid(alpha = 1) {
    return new Color(186, 85, 211, alpha, "mediumorchid");
  }

  static MediumPurple(alpha = 1) {
    return new Color(147, 112, 219, alpha, "mediumpurple");
  }

  static MediumSeagreen(alpha = 1) {
    return new Color(60, 179, 113, alpha, "mediumseagreen");
  }

  static MediumSlateBlue(alpha = 1) {
    return new Color(123, 104, 238, alpha, "mediumslateblue");
  }

  static MediumSpringGreen(alpha = 1) {
    return new Color(0, 250, 154, alpha, "mediumspringgreen");
  }

  static MediumTurquoise(alpha = 1) {
    return new Color(72, 209, 204, alpha, "mediumturquoise");
  }

  static MediumVioletRed(alpha = 1) {
    return new Color(199, 21, 133, alpha, "mediumvioletred");
  }

  static MidnightBlue(alpha = 1) {
    return new Color(25, 25, 112, alpha, "midnightblue");
  }

  static MintCream(alpha = 1) {
    return new Color(245, 255, 250, alpha, "mintcream");
  }

  static MistyRose(alpha = 1) {
    return new Color(255, 228, 225, alpha, "mistyrose");
  }

  static Moccasin(alpha = 1) {
    return new Color(255, 228, 181, alpha, "moccasin");
  }

  static NavajoWhite(alpha = 1) {
    return new Color(255, 222, 173, alpha, "navajowhite");
  }

  static OldLace(alpha = 1) {
    return new Color(253, 245, 230, alpha, "oldlace");
  }

  static Olivedrab(alpha = 1) {
    return new Color(107, 142, 35, alpha, "olivedrab");
  }

  static Orange(alpha = 1) {
    return new Color(255, 165, 0, alpha, "orange");
  }

  static OrangeRed(alpha = 1) {
    return new Color(255, 69, 0, alpha, "orangered");
  }

  static Orchid(alpha = 1) {
    return new Color(218, 112, 214, alpha, "orchid");
  }

  static PaleGoldenrod(alpha = 1) {
    return new Color(238, 232, 170, alpha, "palegoldenrod");
  }

  static PaleGreen(alpha = 1) {
    return new Color(152, 251, 152, alpha, "palegreen");
  }

  static PaleTurquoise(alpha = 1) {
    return new Color(175, 238, 238, alpha, "paleturquoise");
  }

  static PaleVioletRed(alpha = 1) {
    return new Color(219, 112, 147, alpha, "palevioletred");
  }

  static PapayaWhip(alpha = 1) {
    return new Color(255, 239, 213, alpha, "papayawhip");
  }

  static PeachPuff(alpha = 1) {
    return new Color(255, 218, 185, alpha, "peachpuff");
  }

  static Peru(alpha = 1) {
    return new Color(205, 133, 63, alpha, "peru");
  }

  static Pink(alpha = 1) {
    return new Color(255, 192, 203, alpha, "pink");
  }

  static Plum(alpha = 1) {
    return new Color(221, 160, 221, alpha, "plum");
  }

  static PowderBlue(alpha = 1) {
    return new Color(176, 224, 230, alpha, "powderblue");
  }

  static RosyBrown(alpha = 1) {
    return new Color(188, 143, 143, alpha, "rosybrown");
  }

  static RoyalBlue(alpha = 1) {
    return new Color(65, 105, 225, alpha, "royalblue");
  }

  static SaddleBrown(alpha = 1) {
    return new Color(139, 69, 19, alpha, "saddlebrown");
  }

  static Salmon(alpha = 1) {
    return new Color(250, 128, 114, alpha, "salmon");
  }

  static SandyBrown(alpha = 1) {
    return new Color(244, 164, 96, alpha, "sandybrown");
  }

  static Seagreen(alpha = 1) {
    return new Color(46, 139, 87, alpha, "seagreen");
  }

  static Seashell(alpha = 1) {
    return new Color(255, 245, 238, alpha, "seashell");
  }

  static Sienna(alpha = 1) {
    return new Color(160, 82, 45, alpha, "sienna");
  }

  static SkyBlue(alpha = 1) {
    return new Color(135, 206, 235, alpha, "skyblue");
  }

  static SlateBlue(alpha = 1) {
    return new Color(106, 90, 205, alpha, "slateblue");
  }

  static SlateGray(alpha = 1) {
    return new Color(112, 128, 144, alpha, "slategray");
  }

  static SlateGrey(alpha = 1) {
    return new Color(112, 128, 144, alpha, "slategrey");
  }

  static Snow(alpha = 1) {
    return new Color(255, 250, 250, alpha, "snow");
  }

  static SpringGreen(alpha = 1) {
    return new Color(0, 255, 127, alpha, "springgreen");
  }

  static SteelBlue(alpha = 1) {
    return new Color(70, 130, 180, alpha, "steelblue");
  }

  static Tan(alpha = 1) {
    return new Color(210, 180, 140, alpha, "tan");
  }

  static Thistle(alpha = 1) {
    return new Color(216, 191, 216, alpha, "thistle");
  }

  static Tomato(alpha = 1) {
    return new Color(255, 99, 71, alpha, "tomato");
  }

  static Turquoise(alpha = 1) {
    return new Color(64, 224, 208, alpha, "turquoise");
  }

  static Violet(alpha = 1) {
    return new Color(238, 130, 238, alpha, "violet");
  }

  static Wheat(alpha = 1) {
    return new Color(245, 222, 179, alpha, "wheat");
  }

  static WhiteSmoke(alpha = 1) {
    return new Color(245, 245, 245, alpha, "whitesmoke");
  }

  static YellowGreen(alpha = 1) {
    return new Color(154, 205, 50, alpha, "yellowgreen");
  }
}

export default Color;
