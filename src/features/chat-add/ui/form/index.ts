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
  private readonly _onStoreUpdate;

  constructor() {
    addChatController.start();

    const { addChat } = store.getState<IAddChatStoreSlice>();
    const { load, ...inputs } = addChat;

    const inputMap = getInputMap(fieldsParams, inputs);

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

    this._onStoreUpdate = ({ addChat }: IAddChatStoreSlice) => {
      const { load, ...fields } = addChat;

      Object.entries(fields).forEach(([field, props]) => {
        const block = inputMap[field];
        if (block) {
          block.setProps({ ...props });
        }
      });

      submitButton.setProps({ disabled: load });
    };

    store.on<IAddChatStoreSlice>(this._onStoreUpdate);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
