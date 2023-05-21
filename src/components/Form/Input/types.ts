import { IComponent } from '@/types/Component';
import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { createFormStore } from 'react-form-states';

export interface IInputProps extends IComponent {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  formStore: ReturnType<typeof createFormStore>;
}

export interface ITextareaProps extends IComponent {
  inputProps: TextareaHTMLAttributes<HTMLTextAreaElement>;
  formStore: ReturnType<typeof createFormStore>;
}
