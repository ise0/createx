import { NumberInput, Props as NumberInputProps } from './number-input';
import { TextInput, Props as TextInputProps } from './text-input';

type Props =
  | (TextInputProps & { type: 'text' | 'search' | 'password' | 'email' })
  | (NumberInputProps & { type: 'number' });

export function Input(props: Props) {
  const { type } = props;
  if (type === 'number') return <NumberInput {...props} />;
  if (['text', 'search', 'password'].includes(type)) return <TextInput {...props} />;

  return null;
}
