import { Block } from 'shared/components/block/block';
import { Store } from 'shared/components/store/store';
import { ButtonFilled } from 'shared/ui/main-button/button-filled.block';
import type { TAddChatState } from '../../model/chat-add.model';
import { addChatController } from '../../controller/chat-add.controller';
import { fieldsParams } from './_lib';
import templateSpec from './add-chat-form.template.hbs';
import { makeFields } from 'shared/helpers/make';

const store = Store.instance();

export class AddChatForm extends Block {
  private readonly _inputMap;
  private readonly _submitButton;

  constructor() {
    const inputMap = makeFields(fieldsParams);

    const submitButton = new ButtonFilled({
      label: 'Create chat',
      type: 'submit',
    });

    super({
      ...inputMap,
      submitButton,
      onInput: (e: Event) => {
        addChatController.input(e);
      },
      onSubmit: (e: Event) => {
        e.preventDefault();
        addChatController.submit();
      },
    });

    this._inputMap = inputMap;
    this._submitButton = submitButton;
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  private readonly _onStoreUpdate = ({ addChat }: TAddChatState): void => {
    const { load, fields } = addChat;

    Object.entries(fields).forEach(([field, props]) => {
      const block = this._inputMap[field];
      if (block) {
        block.setProps({ ...props });
      }
    });

    this._submitButton.setProps({ disabled: load });
  };

  public didMount(): void {
    store.on(this._onStoreUpdate);
    addChatController.start();
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
