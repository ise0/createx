import { Dispatch, SetStateAction } from 'react';

export type CommonProps = {
  className?: string;
  type: 'checkbox' | 'radio';
  text: string;
  value: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
  title?: string;
  name?: string;
  disabled?: boolean;
};

export type Option<T> = {
  id: T;
  text: string;
  disabled?: boolean;
};

export type FlagGroupProps<OptionId extends string | number, ExtraOptionProps = {}> = {
  className?: string;
  name: string;
  disabled?: boolean;
  options: (Option<OptionId> & ExtraOptionProps)[];
} & (
  | { type: 'radio'; value: OptionId | undefined; onChange: Dispatch<SetStateAction<OptionId>> }
  | { type: 'checkbox'; value: OptionId[]; onChange: Dispatch<SetStateAction<OptionId[]>> }
);
