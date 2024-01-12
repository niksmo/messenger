type TFormData = Record<string, string>;

interface IReqBody {
  oldPassword: string;
  newPassword: string;
}

const FIELD = {
  CURRENT: 'current_password',
  NEW: 'new_password',
};

export function extractRequestBody(formData: TFormData): IReqBody {
  const map = Object.entries(formData).reduce<IReqBody>(
    (map, [field, value]) => {
      if (field === FIELD.CURRENT) {
        map.oldPassword = value;
      }

      if (field === FIELD.NEW) {
        map.newPassword = value;
      }

      return map;
    },
    { oldPassword: '', newPassword: '' }
  );

  return map;
}
