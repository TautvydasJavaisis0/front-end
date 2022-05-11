import { Input, Select, InputNumber, DatePicker, Checkbox } from 'antd';
// tslint:disable-next-line:no-submodule-imports
import { TextAreaRef } from 'antd/es/input/TextArea';

import { formInput } from 'app/components/inputs/common/form-input';

// Multiple line text area
const { TextArea } = Input;
const TextAreaField = formInput(TextArea);
// Date range picker field
const { RangePicker } = DatePicker;
const RangePickerField = formInput(RangePicker);
const CheckboxField = formInput(Checkbox);

const InputNumberField = formInput(InputNumber);
const InputField = formInput(Input);
const PasswordInputField = formInput(Input.Password);
const SelectField = formInput(Select);

export type { TextAreaRef };

export {
  InputField,
  PasswordInputField,
  SelectField,
  TextArea, TextAreaField,
  InputNumberField,
  RangePickerField,
  CheckboxField,
};
