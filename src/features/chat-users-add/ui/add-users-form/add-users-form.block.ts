import { Block } from 'shared/components/block';
import { Store } from 'shared/components/store/store';
import { ButtonFilled } from 'shared/ui/button';
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
import { FoundUsersList } from '../found-list/found-list.block';

interface AddUsersFormProps {
  login: Block;
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

  constructor() {
    addChatUsersController.start();

    const { addUsers } = store.getState<TAddUsersState>();
    const { fields } = addUsers;

    const inputMap = getInputMap<TFieldUnion>(fieldsParams, fields);

    const foundList = new FoundUsersList();

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
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  private readonly _onStoreUpdate = ({ addUsers }: TAddUsersState): void => {
    const { load, fields } = addUsers;

    getTypedEntries<TFieldUnion, TInputState>(fields).forEach(
      ([field, props]) => {
        const block = this._inputMap[field];
        if (block) {
          block.setProps({ ...props });
        }
      }
    );

    this._submitButton.setProps({ disabled: load });
  };

  public didMount(): void {
    store.on(this._onStoreUpdate);
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
