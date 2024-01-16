import { Block } from 'shared/components/block';
import { Store } from 'shared/components/store';
import { ButtonFilled } from 'shared/ui/button';
import { getFieldsValues, getInputMap, getInputValue } from 'shared/helpers';
import type { IAddChatStoreSlice } from '../../model';
import { addChatController } from '../../controller';
import templateSpec from './form.template.hbs';
import { fieldsParams } from './lib';

const store = Store.instance();

export class AddChatForm extends Block {
  private readonly _inputMap;
  private readonly _submitButton;

  constructor() {
    addChatController.start();

    const { addChat } = store.getState<IAddChatStoreSlice>();
    const { load, ...fieldsState } = addChat;

    const inputMap = getInputMap(fieldsParams, fieldsState);

    const submitButton = new ButtonFilled({
      label: 'Create Chat',
      type: 'submit',
    });

    super({
      ...inputMap,
      submitButton,
      onInput: (e: Event) => {
        addChatController.input(getInputValue(e));
      },
      onSubmit: (e: Event) => {
        e.preventDefault();
        void addChatController.submit(getFieldsValues(e));
      },
    });

    this._inputMap = inputMap;
    this._submitButton = submitButton;
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  private readonly _onStoreUpdate = ({ addChat }: IAddChatStoreSlice): void => {
    const { load, ...fields } = addChat;

    Object.entries(fields).forEach(([field, props]) => {
      const block = this._inputMap[field];
      if (block) {
        block.setProps({ ...props });
      }
    });

    this._submitButton.setProps({ disabled: load });
  };

  public didMount(): void {
    store.on<IAddChatStoreSlice>(this._onStoreUpdate);
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
