import { Block } from 'shared/components/block/block';
import { Store } from 'shared/components/store/store';
import { ButtonFilled } from 'shared/ui/main-button/button-filled.block';
import type { TDeleteUsersState } from 'features/chat-users-delete/model/chat-users-delete.model';
import { ChatUsersList } from '../chat-users-list/chat-users-list.block';
import templateSpec from './delete-users-form.template.hbs';
import styles from './styles.module.css';
import { deleteChatUsersController } from 'features/chat-users-delete/controller/chat-users-delete.controller';

interface DeleteChatUsersFormProps {
  chatUsersList: Block;
  submitButton: Block;
  onSubmit: (e: Event) => void;
}

const store = Store.instance();

export class DeleteChatUsersForm extends Block<DeleteChatUsersFormProps> {
  private readonly _submitButton;

  constructor() {
    deleteChatUsersController.start();

    const chatUsersList = new ChatUsersList();

    const submitButton = new ButtonFilled({
      label: 'Exclude',
      type: 'submit',
    });

    super({
      chatUsersList,
      submitButton,
      onSubmit: (e) => {
        e.preventDefault();
        deleteChatUsersController.deleteChatUsers();
      },
    });

    this._submitButton = submitButton;
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  private readonly _onStoreUpdate = ({
    deleteUsers,
  }: TDeleteUsersState): void => {
    const { load } = deleteUsers;
    this._submitButton.setProps({ disabled: load });
  };

  public didMount(): void {
    store.on(this._onStoreUpdate);
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
