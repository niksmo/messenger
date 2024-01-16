import { Block } from 'shared/components/block';
import { Store } from 'shared/components/store';
import { ButtonFilled } from 'shared/ui/button';
import { getInputMap } from 'shared/helpers';
import { fieldsParams } from './lib';
import templateSpec from './form.template.hbs';
import { type TAddUsersState } from 'features/chat-users/model/chat-users-add.model';
import { addChatUsersController } from 'features/chat-users/controller/chat-users-add.controller';

const store = Store.instance();

export class AddUsersForm extends Block {
  private readonly _inputMap;
  private readonly _submitButton;

  constructor() {
    addChatUsersController.start();

    const { addUsers } = store.getState<TAddUsersState>();
    const { fields } = addUsers;

    const inputMap = getInputMap(fieldsParams, fields);

    const submitButton = new ButtonFilled({
      label: 'Search users',
      type: 'submit',
    });

    super({
      ...inputMap,
      submitButton,
      onInput: (e: Event) => {
        addChatUsersController.input(e);
      },
      onSubmit: (e: Event) => {
        e.preventDefault();
        addChatUsersController.searchUsers();
      },
    });

    this._inputMap = inputMap;
    this._submitButton = submitButton;
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  private readonly _onStoreUpdate = ({ addUsers }: TAddUsersState): void => {
    const { load, fields } = addUsers;

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
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
