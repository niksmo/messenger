type TClass =
  | 'Null'
  | 'Undefined'
  | 'Number'
  | 'String'
  | 'Boolean'
  | 'Object'
  | 'Array'
  | 'Function'
  | 'Map'
  | 'Set'
  | 'Date';

export function classof(o: unknown): TClass {
  return Object.prototype.toString.call(o).slice(8, -1) as TClass;
}
