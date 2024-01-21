import { type IBlock, type IBlockInput } from '../interfaces';

export const enum EVENT {
  inputBlur = 'inputBlur',
  submitStart = 'submitStart',
  request = 'request',
  fetch = 'fetch',
}

type TFormData<FieldUnion extends string> = Record<FieldUnion, string>;
export type TFormHints<FieldUnion extends string> = Record<FieldUnion, string>;

export interface TFetchState {
  fetching: boolean;
  success: boolean;
  error: string;
}

type TSetHintsFn<FieldUnion extends string> = (
  hints: TFormHints<FieldUnion>
) => void;
export type TOnInputBlurCb<FieldUnion extends string> = (
  formData: TFormData<FieldUnion>,
  setHints: TSetHintsFn<FieldUnion>
) => void;
type TNextFn = () => void;

export type TOnStartSubmitCb<FieldUnion extends string> = (
  next: TNextFn,
  formData: TFormData<FieldUnion>,
  setHints: TSetHintsFn<FieldUnion>
) => void;

export type TRequestCb<FieldUnion extends string> = (
  formData: TFormData<FieldUnion>,
  update: (state: TFetchState) => void,
  setHints: TSetHintsFn<FieldUnion>
) => void;

export interface IFormController<FieldUnion extends string> {
  onInputBlur: (cb: TOnInputBlurCb<FieldUnion>) => void;
  onStartSubmit: (cb: TOnStartSubmitCb<FieldUnion>) => void;
  onRequest: (cb: (reqState: TFetchState) => void) => void;
  request: (cb: TRequestCb<FieldUnion>) => void;
}

export interface TFormElements {
  form: IBlock;
  inputMap: Record<string, IBlockInput>;
  buttonMap: Record<string, IBlock>;
}

export function getFormData(
  formElements: TFormElements
): Record<string, string> {
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
): void {
  Object.values(inputBlocks).forEach((inputBlock) => {
    const support = fieldHints[inputBlock.getName()];
    inputBlock.setProps({ support, error: Boolean(support) });
  });
}
