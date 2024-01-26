function throwError(): never {
  throw new Error('Not implemented');
}

export class BaseAPI {
  async create(..._args: unknown[]): Promise<unknown> {
    throwError();
  }

  async request(..._args: unknown[]): Promise<unknown> {
    throwError();
  }

  async update(..._args: unknown[]): Promise<unknown> {
    throwError();
  }

  async delete(..._args: unknown[]): Promise<unknown> {
    throwError();
  }
}
