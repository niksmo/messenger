import { isSomeValues } from 'shared/helpers';

type TStringRules = Record<string, { template: RegExp; hint: string }>;

interface IFileRules {
  size: { max: number; hint: string };
  type: { access: string[]; hint: string };
}

class StringVerifier {
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

class FileVerifier {
  constructor(private readonly rules: IFileRules) {}

  checkOnValidity(file: File): {
    hint: string;
    isValid: boolean;
  } {
    let hint = '';
    let isValid = true;

    const { size: sizeRule, type: typeRule } = this.rules;

    const { size, type } = file;

    if (size > sizeRule.max) {
      hint = sizeRule.hint;
      isValid = false;
    } else if (!this._isAccessType(type)) {
      hint = typeRule.hint;
      isValid = false;
    }

    return {
      hint,
      isValid,
    };
  }

  private _isAccessType(fileType: string): boolean {
    return this.rules.type.access.some((accessType) => fileType === accessType);
  }
}

class VerifierCreator {
  makeStringVerifier(rules: TStringRules): StringVerifier {
    return new StringVerifier(rules);
  }

  makeFileVerifier(rules: IFileRules): FileVerifier {
    return new FileVerifier(rules);
  }
}

const verifierCreator = new VerifierCreator();

export { verifierCreator };
