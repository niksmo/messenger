import { isSomeValues } from 'shared/helpers';

interface IVerifier<InputData> {
  checkOnValidity: (fieldsData: InputData) => {
    hintData: Record<string, string>;
    isValid: boolean;
  };
}

type TStringVerifier = IVerifier<Record<string, string>>;
type TFileVerifier = IVerifier<Record<string, File>>;

type TStringRules = Record<string, { template: RegExp; hint: string }>;
type TFileRules = Record<string, { maxSize: number; hint: string }>;

interface IVerifierCreator {
  makeStringVerifier: (rules: TStringRules) => TStringVerifier;
  makeFileVerifier: (rules: TFileRules) => TFileVerifier;
}

class StringVerifier implements TStringVerifier {
  constructor(private readonly rules: TStringRules) {}

  checkOnValidity(fieldsData: Record<string, string>): {
    hintData: Record<string, string>;
    isValid: boolean;
  } {
    const hintData: Record<string, string> = {};

    for (const [field, value] of Object.entries(fieldsData)) {
      const rule = this.rules[field];
      if (rule) {
        const { template, hint } = rule;
        hintData[field] = value.match(template) ? '' : hint;
      }
    }

    const isValid = !isSomeValues(hintData);

    return { hintData, isValid };
  }
}

class FileVerifier implements TFileVerifier {
  constructor(private readonly rules: TFileRules) {}

  checkOnValidity(_fieldsData: Record<string, File>): {
    hintData: Record<string, string>;
    isValid: boolean;
  } {
    console.warn(this.rules);
    return {
      hintData: {
        foo: '',
        bar: '',
      },
      isValid: true,
    };
  }
}

class VerifierCreator implements IVerifierCreator {
  makeStringVerifier(rules: TStringRules): TStringVerifier {
    return new StringVerifier(rules);
  }

  makeFileVerifier(rules: TFileRules): TFileVerifier {
    return new FileVerifier(rules);
  }
}

const verifierCreator = new VerifierCreator();

export { verifierCreator };
