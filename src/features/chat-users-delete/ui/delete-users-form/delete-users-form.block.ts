import { Block } from 'shared/components/block/block';
import { Store } from 'shared/components/store/store';
import { ButtonFilled } from 'shared/ui/main-button/button-filled.block';
import { ChatUsersList } from '../chat-users-list/chat-users-list.block';
import templateSpec from './delete-users-form.template.hbs';
import styles from './styles.module.css';

interface DeleteChatUsersFormProps {
  login: Block;
  foundList: Block;
  submitButton: Block;
  onInput: (e: Event) => void;
  onSubmit: (e: Event) => void;
}

const store = Store.instance();

export class DeleteChatUsersForm extends Block<DeleteChatUsersFormProps> {
  private readonly _submitButton;

  constructor() {
    // addChatUsersController.start();

    // const { addUsers } = store.getState<TAddUsersState>();

    const chatUserList = new ChatUsersList();

    const submitButton = new ButtonFilled({
      label: 'Exclude',
      type: 'submit',
    });

    super({
      chatUserList,
      submitButton,
      onSubmit: (e) => {
        e.preventDefault();
        // addChatUsersController.addToChat();
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

  private readonly _onStoreUpdate = ({ addUsers }: TAddUsersState): void => {
    const { load } = addUsers;
    this._submitButton.setProps({ disabled: load });
  };

  public didMount(): void {
    store.on(this._onStoreUpdate);
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
