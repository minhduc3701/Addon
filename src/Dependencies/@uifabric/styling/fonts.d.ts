import { IFontStyles, IFontWeight } from "./index";
export declare namespace LocalizedFontNames {
  const Arabic = "Segoe UI Web (Arabic)";
  const Cyrillic = "Segoe UI Web (Cyrillic)";
  const EastEuropean = "Segoe UI Web (East European)";
  const Greek = "Segoe UI Web (Greek)";
  const Hebrew = "Segoe UI Web (Hebrew)";
  const Thai = "Leelawadee UI Web";
  const Vietnamese = "Segoe UI Web (Vietnamese)";
  const WestEuropean = "Segoe UI Web (West European)";
  const Selawik = "Selawik Web";
  const Armenian = "Segoe UI Web (Armenian)";
  const Georgian = "Segoe UI Web (Georgian)";
}
export declare namespace LocalizedFontFamilies {
  const Arabic: string;
  const ChineseSimplified = "'Microsoft Yahei UI', Verdana, Simsun";
  const ChineseTraditional = "'Microsoft Jhenghei UI', Pmingliu";
  const Cyrillic: string;
  const EastEuropean: string;
  const Greek: string;
  const Hebrew: string;
  const Hindi = "'Nirmala UI'";
  const Japanese = "'Yu Gothic UI', 'Meiryo UI', Meiryo, 'MS Pgothic', Osaka";
  const Korean = "'Malgun Gothic', Gulim";
  const Selawik: string;
  const Thai = "'Leelawadee UI Web', 'Kmer UI'";
  const Vietnamese: string;
  const WestEuropean: string;
  const Armenian: string;
  const Georgian: string;
}
export declare namespace FontSizes {
  const mini: string;
  const xSmall: string;
  const small: string;
  const smallPlus: string;
  const medium: string;
  const mediumPlus: string;
  const icon: string;
  const large: string;
  const xLarge: string;
  const xLargePlus: string;
  const xxLarge: string;
  const xxLargePlus: string;
  const superLarge: string;
  const mega: string;
}
export declare namespace FontWeights {
  const light: IFontWeight;
  const semilight: IFontWeight;
  const regular: IFontWeight;
  const semibold: IFontWeight;
  const bold: IFontWeight;
}
export declare namespace IconFontSizes {
  const xSmall: string;
  const small: string;
  const medium: string;
  const large: string;
}
export declare function createFontStyles(
  localeCode: string | null
): IFontStyles;
