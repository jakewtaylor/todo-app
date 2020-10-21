import React from 'react';

type Variant = 'default' | 'text';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
  variant?: Variant;
};

export const Button: React.FC<Props> = ({
  children,
  disabled,
  variant = 'default',
  ...buttonProps
}) => {
  const variantClasses: Record<Variant, string> = {
    default: `bg-indigo-600 text-indigo-100 ${
      disabled ? '' : 'hover:bg-indigo-700'
    }`,
    text: `text-indigo-500 ${disabled ? '' : 'hover:bg-gray-100'}`,
  };

  return (
    <button
      className={`text-sm py-2 px-3 rounded leading-none font-semibold ml-2 ${
        variantClasses[variant]
      } ${disabled ? 'cursor-auto' : ''}`}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
