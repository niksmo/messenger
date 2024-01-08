interface IBaseAPI {
  create: () => Promise<unknown>;
  read: () => Promise<unknown>;
  update: () => Promise<unknown>;
  delete: () => Promise<unknown>;
}

function throwError(): never {
  throw new Error('Not implemented');
}

export class BaseAPI implements IBaseAPI {
  async create(): Promise<unknown> {
    throwError();
  }

  async read(): Promise<unknown> {
    throwError();
  }

  async update(): Promise<unknown> {
    throwError();
  }

  async delete(): Promise<unknown> {
    throwError();
  }
}
