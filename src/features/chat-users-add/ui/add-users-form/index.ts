import { Block } from 'shared/components/block';
import { Store } from 'shared/components/store';
import { ButtonFilled } from 'shared/ui/button';
import { type Input } from 'shared/ui/input';
import { ChatUsersList } from 'entites/chat-user/ui/chat-users-list';
import { getInputMap, getTypedEntries, withDelay } from 'shared/helpers';
import {
  type TFieldUnion,
  type TAddUsersState,
  type TInputState,
} from '../../model/chat-users-add.model';
import { addChatUsersController } from '../../controller/chat-users-add.controller';
import { fieldsParams } from './lib';
import templateSpec from './form.template.hbs';
import styles from './styles.module.css';

interface AddUsersFormProps {
  login: Input;
  foundList: Block;
  submitButton: Block;
  onInput: (e: Event) => void;
  onSubmit: (e: Event) => void;
}

const store = Store.instance();

const searchUsersWithDelay = withDelay(
  addChatUsersController.searchUsers.bind(addChatUsersController),
  400
);

export class AddUsersForm extends Block<AddUsersFormProps> {
  private readonly _inputMap;
  private readonly _submitButton;
  private readonly _foundList;

  constructor() {
    addChatUsersController.start();

    const { addUsers } = store.getState<TAddUsersState>();
    const { fields, found } = addUsers;

    const inputMap = getInputMap<TFieldUnion>(fieldsParams, fields);

    const foundList = new ChatUsersList({ users: found });

    const submitButton = new ButtonFilled({
      label: 'Add to chat',
      type: 'submit',
    });

    super({
      ...inputMap,
      foundList,
      submitButton,
      onInput: (e) => {
        if (e instanceof InputEvent) {
          addChatUsersController.input(e);
          searchUsersWithDelay();
        }
      },
      onSubmit: (e) => {
        e.preventDefault();
      },
    });

    this._inputMap = inputMap;
    this._submitButton = submitButton;
    this._foundList = foundList;
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  private readonly _onStoreUpdate = ({ addUsers }: TAddUsersState): void => {
    const { load, fields, found } = addUsers;

    getTypedEntries<TFieldUnion, TInputState>(fields).forEach(
      ([field, props]) => {
        const block = this._inputMap[field];
        if (block) {
          block.setProps({ ...props });
        }
      }
    );

    this._foundList.setProps({ users: found });

    this._submitButton.setProps({ disabled: load });
  };

  public didMount(): void {
    store.on(this._onStoreUpdate);
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
