import { Store } from 'shared/components/store/store';
import { AppRouter } from 'shared/components/router/router';
import { getInputValue, getTypedEntries } from 'shared/helpers/get';
import { ROUTE_PATH } from 'shared/constants/routes';
import type {
  TChatUsersSate,
  TUser,
} from 'entites/chat-user/model/chat-user.model';
import { type TChatListState } from 'entites/chat/model/chat-list.model';
import { chatUsersController } from 'entites/chat-user/controller/chat-users.controller';
import {
  fieldList,
  type TAddUsersState,
  type TInputState,
  type TFieldUnion,
  type TFoundUser,
} from '../model/chat-users-add.model';
import { ChatUsersAddAPI } from '../api/chat-users-add.api';

const STORE_SLICE = 'addUsers';
const STORE_FIELDS = STORE_SLICE + '.fields';
const STORE_FOUND = STORE_SLICE + '.found';
const STORE_SELECT = STORE_SLICE + '.select';
const STORE_LOAD = STORE_SLICE + '.load';

export class AddChatUsersController {
  private readonly _api;
  private readonly _store;
  private readonly _router;

  constructor() {
    this._api = new ChatUsersAddAPI();
    this._store = Store.instance();
    this._router = AppRouter.instance();
  }

  start(): void {
    void chatUsersController.getChatUsers();

    const fields: Record<string, TInputState> = {};

    fieldList.reduce((map, fieldName) => {
      map[fieldName] = { value: '', hint: '', error: false };
      return map;
    }, fields);

    this._store.set(STORE_SLICE, {
      fields,
      load: false,
      found: [],
      select: [],
    });
  }

  private _resetState(): void {
    this.start();
  }

  private _extractFormData(): Record<TFieldUnion, string> {
    const { addUsers } = this._store.getState<TAddUsersState>();
    const { fields } = addUsers;

    const entries = getTypedEntries<TFieldUnion, TInputState>({ ...fields });

    const formData: Record<TFieldUnion, string> = Object.create(null);

    entries.reduce((map, [fieldName, inputState]) => {
      map[fieldName] = inputState.value;
      return map;
    }, formData);

    return formData;
  }

  private _makeAddedParam(foundUsers: TUser[]): TFoundUser[] {
    const { chatUsers } = this._store.getState<TChatUsersSate>();

    if (!chatUsers) {
      throw Error('ChatUsers not exist in Store');
    }

    return foundUsers.map((userData) => {
      const { id } = userData;

      const foundUser: TFoundUser = Object.assign({ isAdded: false }, userData);

      foundUser.isAdded = Boolean(chatUsers[id]);
      return foundUser;
    });
  }

  private async _searchUsers(): Promise<void> {
    const formData = this._extractFormData();
    formData.login = formData.login.trim();
    if (!formData.login) {
      this._resetState();
      return;
    }

    try {
      this._store.set(STORE_LOAD, true);

      const xhr = await this._api.request(formData);
      const { status, response } = xhr;

      if (status === 200) {
        if (typeof response === 'string') {
          const usersList: TUser[] = JSON.parse(response);
          const foundList = this._makeAddedParam(usersList);
          this._store.set(STORE_FOUND, foundList);
          return;
        }
      }

      if (status === 400) {
        if (typeof response === 'string') {
          const { reason } = JSON.parse(response);

          if (typeof reason === 'string' && reason.startsWith('Login')) {
            this._store.set(`${STORE_FIELDS}.login`, {
              hint: reason,
              error: true,
            });
          }
        }
        return;
      }

      if (status === 401) {
        this._store.set('viewer', { auth: false });
        return;
      }

      if (status === 500) {
        this._router.go(ROUTE_PATH[500]);
      }
    } catch (err) {
      console.warn(err);
    } finally {
      this._store.set(STORE_LOAD, false);
    }
  }

  private async _addToChat(): Promise<void> {
    const { addUsers, chatList } = this._store.getState<
      TAddUsersState & TChatListState
    >();

    const { select: selectedUsers } = addUsers;
    const { active: activeChat } = chatList;

    if (selectedUsers.length === 0 || !activeChat) {
      return;
    }

    this._store.set(STORE_LOAD, true);

    try {
      const xhr = await this._api.create({
        chatId: activeChat.id,
        users: selectedUsers,
      });
      const { status, response } = xhr;

      if (status === 200) {
        this._resetState();
        this._router.go(ROUTE_PATH.MAIN);
        return;
      }

      if (status === 400) {
        if (typeof response === 'string') {
          const { reason } = JSON.parse(response);

          if (typeof reason === 'string') {
            this._store.set(`${STORE_FIELDS}.login`, {
              hint: reason,
              error: true,
            });
          }
        }

        return;
      }

      if (status === 401) {
        this._resetState();
        this._store.set('viewer', { auth: false });
        return;
      }

      if (status === 500) {
        this._resetState();
        this._router.go(ROUTE_PATH[500]);
      }
    } catch (err) {
      console.warn(err);
    } finally {
      this._store.set(STORE_LOAD, false);
    }
  }

  private _select(userId: number): void {
    const { addUsers } = this._store.getState<TAddUsersState>();
    const { select } = addUsers;
    select.push(userId);
  }

  private _unselect(userId: number): void {
    const { addUsers } = this._store.getState<TAddUsersState>();
    const { select } = addUsers;

    const filteredList = select.filter(
      (selectedUserId) => selectedUserId !== userId
    );
    this._store.set(STORE_SELECT, filteredList);
  }

  public input(e: Event): void {
    const { field, value } = getInputValue(e);
    this._store.set(`${STORE_FIELDS}.${field}`, { value, error: false });
  }

  public searchUsers(): void {
    void this._searchUsers();
  }

  public select(e: Event): void {
    const { target } = e;
    if (target instanceof HTMLInputElement) {
      const { checked, value } = target;
      if (checked) {
        this._select(parseInt(value));
      } else {
        this._unselect(parseInt(value));
      }
    }
  }

  public addToChat(): void {
    void this._addToChat();
  }
}

const addChatUsersController = new AddChatUsersController();

export { addChatUsersController };
