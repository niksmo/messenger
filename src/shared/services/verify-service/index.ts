interface IVerifier {
  verify(
    map: Record<string, string>,
    cb: (result: Record<string, string>) => void
  ): Record<string, string>;
}

class Verifier implements IVerifier {
  private templateMap: Record<string, RegExp> = {
    name: /(^[A-Z]+[a-z\-]*$)|(^[А-ЯЁ]+[а-яё-]*$)/,
    login: /^(?![0-9]{3,20}$)[a-z\d]{1}([a-z-_\d]){2,19}$/,
    email: /^[a-zA-Z0-9.!#$%&'*+\=?^_`{|}~-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
    password:
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d~!@#$%^&*()_+-=[\]\{}|;':",.\/<>?]{8,40}$/,
    phone: /^\+?\d{10,15}$/,
  };

  private supportMap: Record<string, string> = {
    name: 'Latin or сyrillic letters with first capital letter, without spaces',
    login: 'Latin letters from 3 to 20 characters, can contain numbers',
    email: 'Invalid address',
    password:
      'One uppercase letter and one digit are required, from 8 to 40 characters',
    phone: 'From 10 to 15 digit, may start with plus symbol',
  };

  public verify<F extends string>(
    map: Record<F, string>,
    cb?: (result: Record<F, string>) => void
  ) {
    const entries = Object.entries(map) as [F, string][];

    const resultEntries: [F, string][] = entries.map(([key, value]) => {
      const templateName = key.endsWith('name') ? 'name' : key;
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
