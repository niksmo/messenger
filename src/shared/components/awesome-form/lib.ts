import { IBlock, IBlockForm, IBlockInput } from '../interfaces';

export const enum EVENT {
  inputBlur = 'inputBlur',
  submitStart = 'submitStart',
  request = 'request',
}

export type TFormElements = {
  form: IBlockForm;
  inputMap: Record<string, IBlockInput>;
  button: Record<string, IBlock>;
};

export type TRequestState = {
  fetching: boolean;
  success: boolean;
  error: string;
};

export type TCallBack = (...arg: unknown[]) => unknown;

export type TCallBackMap = {
  inputBlur: TCallBack[];
  submitStart: TCallBack[];
  request: TCallBack[];
};

export function getFormData(formElements: TFormElements) {
  const { inputMap } = formElements;

  const formData: Record<string, string> = {};

  Object.entries(inputMap).reduce((acc, [name, inputBlock]) => {
    acc[name] = inputBlock.getValue();
    return acc;
  }, formData);

  return formData;
}

export function isSupport(
  probVerifyRes: unknown
): probVerifyRes is Record<string, string> {
  return (
    probVerifyRes !== null &&
    typeof probVerifyRes === 'object' &&
    !Object.values(probVerifyRes).some(
      probSupport => typeof probSupport !== 'string'
    )
  );
}

export function renderSupport(
  verifyRes: Record<string, string>,
  inputBlocks: Record<string, IBlockInput>
) {
  Object.values(inputBlocks).forEach(inputBlock => {
    const support = verifyRes[inputBlock.getName()];
    inputBlock.setProps({ support, error: Boolean(support) });
  });
}
