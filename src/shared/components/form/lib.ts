import { IBlock, IBlockForm, IBlockInput } from '../interfaces';

export const enum EVENT {
  inputBlur = 'inputBlur',
  submitStart = 'submitStart',
  request = 'request',
  fetch = 'fetch',
}

export type TFormElements = {
  form: IBlockForm;
  inputMap: Record<string, IBlockInput>;
  buttonMap: Record<string, IBlock>;
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

export function renderHits(
  fieldHints: Record<string, string>,
  inputBlocks: Record<string, IBlockInput>
) {
  Object.values(inputBlocks).forEach(inputBlock => {
    const support = fieldHints[inputBlock.getName()];
    inputBlock.setProps({ support, error: Boolean(support) });
  });
}
