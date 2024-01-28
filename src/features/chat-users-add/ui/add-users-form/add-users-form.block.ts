import { Block } from 'shared/components/block/block';
import { Store } from 'shared/components/store/store';
import { getTypedEntries } from 'shared/helpers/get';
import { withDelay } from 'shared/helpers/with';
import { ButtonFilled } from 'shared/ui/main-button/button-filled.block';
import { makeFields } from 'shared/helpers/make';
import {
  type TFieldUnion,
  type TAddUsersState,
  type TInputState,
} from '../../model/chat-users-add.model';
import { addChatUsersController } from '../../controller/chat-users-add.controller';
import { FoundUsersList } from '../found-list/found-list.block';
import templateSpec from './add-users-form.template.hbs';
import styles from './styles.module.css';
import { fieldsParams } from './_lib';
import { chatListController } from 'entites/chat/controller/chat-list.controller';

interface AddUsersFormProps {
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
    const inputMap = makeFields(fieldsParams);

    const foundList = new FoundUsersList();

    const submitButton = new ButtonFilled({
      label: 'Add',
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
        addChatUsersController.addToChat();
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
    chatListController.start();
    addChatUsersController.start();
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
