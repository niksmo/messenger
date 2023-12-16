import { HINT, TEMPLATE } from './lib';

interface IVerifier {
  verify(
    map: Record<string, string>,
    cb: (result: Record<string, string>) => void
  ): Record<string, string>;
}

class Verifier implements IVerifier {
  private templateMap: Record<string, RegExp> = {
    first_name: TEMPLATE.name,
    second_name: TEMPLATE.name,
    login: TEMPLATE.login,
    email: TEMPLATE.email,
    password: TEMPLATE.password,
    phone: TEMPLATE.phone,
  };

  private supportMap: Record<string, string> = {
    first_name: HINT.name,
    second_name: HINT.name,
    login: HINT.login,
    email: HINT.email,
    password: HINT.password,
    phone: HINT.phone,
  };

  public verify<F extends string>(
    map: Record<F, string>,
    cb?: (result: Record<F, string>) => void
  ) {
    const entries = Object.entries(map) as [F, string][];

    const resultEntries: [F, string][] = entries.map(([key, value]) => {
      const templateName = key;
      const template = this.templateMap[templateName];
      const support = this.supportMap[templateName];

      if (!template || !support) {
        return [key, ''];
      }

      const supportText = value.match(template) ? '' : support;

      return [key, supportText];
    });

    const resultMap = Object.fromEntries(resultEntries) as Record<F, string>;

    if (cb) {
      cb(resultMap);
    }

    return resultMap;
  }
}

const verifyService = new Verifier();

export { verifyService };
export type { IVerifier };
