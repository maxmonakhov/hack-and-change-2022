import { ChangeEvent, memo, useCallback, useState } from 'react';

type SignableProps = {
  onChange(isChecked: boolean): void;
};

const Signable = (props: SignableProps) => {
  const { onChange } = props;

  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.currentTarget.checked;
      setChecked(isChecked);
      onChange(isChecked);
    },
    []
  );

  return (
    <div>
      <p>Сделать сообщение подписываемым?</p>
      <div className="mt-4 flex items-center gap-2">
        Нет
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          className="toggle-info toggle"
          checked={checked}
        />
        Да
      </div>
    </div>
  );
};

export default memo(Signable);
