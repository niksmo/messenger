interface IVerifier {
  verify(map: Record<string, string>): Record<string, string>;
  onVerifyResult(resultMap: Record<string, string>): void;
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

  public verify(map: Record<string, string>) {
    const entries = Object.entries(map);

    const resultEntries = entries.map(([key, value]) => {
      const templateName = key.endsWith('name') ? 'name' : key;
      const template = this.templateMap[templateName];

      if (!template) {
        throw Error(
          `Verify template does not exist. Template: ${templateName}`
        );
      }

      const support = ~value.search(template)
        ? ''
        : this.supportMap[templateName];

      if (!support) {
        throw Error(
          `Verify support text does not exist. Template: ${templateName}`
        );
      }

      return [key, support];
    });

    const resultMap = Object.fromEntries(resultEntries);

    this.onVerifyResult(resultMap);

    return resultMap;
  }

  public onVerifyResult(_resultMap: Record<string, string>): void {}
}

export { Verifier };
export type { IVerifier };
