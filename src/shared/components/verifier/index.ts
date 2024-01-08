import { HINT, TEMPLATE } from './lib';

interface IVerifier {
  verify: (
    map: Record<string, string>,
    cb: (result: Record<string, string>) => void
  ) => Record<string, string>;
}

class Verifier implements IVerifier {
  private readonly templateMap: Record<string, RegExp> = {
    first_name: TEMPLATE.name,
    second_name: TEMPLATE.name,
    login: TEMPLATE.login,
    email: TEMPLATE.email,
    password: TEMPLATE.password,
    new_password: TEMPLATE.password,
    phone: TEMPLATE.phone,
  };

  private readonly supportMap: Record<string, string> = {
    first_name: HINT.name,
    second_name: HINT.name,
    login: HINT.login,
    email: HINT.email,
    password: HINT.password,
    new_password: HINT.password,
    phone: HINT.phone,
  };

  public verify<FieldName extends string>(
    map: Record<FieldName, string>,
    cb?: (result: Record<FieldName, string>) => void
  ): Record<FieldName, string> {
    const entries = Object.entries(map) as Array<[FieldName, string]>;

    const resultEntries: Array<[FieldName, string]> = entries.map(
      ([key, value]) => {
        const templateName = key;
        const template = this.templateMap[templateName];
        const support = this.supportMap[templateName];

        if (!template || !support) {
          return [key, ''];
        }

        const supportText = value.match(template) ? '' : support;

        return [key, supportText];
      }
    );

    const resultMap = Object.fromEntries(resultEntries) as Record<
      FieldName,
      string
    >;

    if (cb) {
      cb(resultMap);
    }

    return resultMap;
  }
}

const verifyService = new Verifier();

export { verifyService };
export type { IVerifier };
