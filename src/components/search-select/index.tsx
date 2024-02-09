import {FC} from 'react';

import {Select} from 'antd';
import {ISelectOption} from "../../services/api/types/common.ts";

interface SearchSelectProps {
    options: ISelectOption[];
    value?: string;
    onChange?: (value: string) => void;
}

export const SearchSelect: FC<SearchSelectProps> = ({
                                                        options,
                                                        value,
                                                        onChange,
                                                    }) => {
    const filterOption = (input: string, option?: ISelectOption): boolean =>
        (option?.label ?? '').toLowerCase().indexOf(input.toLowerCase()) >= 0;

    return (
        <Select
            value={value}
            onChange={onChange}
            showSearch
            filterOption={filterOption}
            optionFilterProp="label"
            options={options}
            onClick={(e) => e.stopPropagation()}
        />
    );
};
