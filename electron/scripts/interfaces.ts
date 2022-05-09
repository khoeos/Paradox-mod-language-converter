export interface requestInterface {
  game: number;
  path: string;
  output: number;
  sourceLanguage?: string;
  outputLanguages: {
    english: boolean;
    french: boolean;
    german: boolean;
    spanish: boolean;
    russian: boolean;
    chinese: boolean;
    portugese: boolean;
    polish: boolean;
  };
  options?: string[];
}

export default {};
