import { useState, useEffect } from 'react';
import { getNestedValue, setNestedValue } from '@/utils/ObjectUtils';
import ComponentInitializer from "@/utils/ComponentInitializer";

const { HOF } = ComponentInitializer.init('useInputTextBind');

/**
 * Input Text 타입의 값으로 양방향 바이딩 처리하는 훅
 * 
 * @param {String} initialValue [선택] 초기 셋팅 값. 기본 빈값('')
 */
export const useTextValueBind = HOF(initialValue => {
    const [value, setValue] = useState(initialValue ? initialValue : '');

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const reset = () => {
        setValue(initialValue);
    };

    return {
        attr: {
            value,
            onChange
        },
        event: {
            setValue,
            reset
        }
    };
}, 'useTextValueBind');

/**
 * Input Text 타입의 context 값으로 양방향 바이딩 처리하는 훅
 * 
 * @param {Object} context [필수] Context Object
 * @param {String} field [필수] Context 데이터에 정의된 바인딩할 field명. 점(.)을 이용해 하위 필드까지 접근 가능
 */
export const useTextContextBind = HOF((context, field) => {
    if (!context || !field) {
        throw new Error('Required useTextContextBind params....');
    }

    const [data, setData] = context;
    const initialValue = getNestedValue(data, field);

    const onChange = (e) => {
        setNestedValue(data, field, e.target.value);
        setData({ ...data });
    };

    const reset = () => {
        setNestedValue(data, field, initialValue);
        setData({ ...data });
    };

    const setValue = val => {
        setNestedValue(data, field, val);
        setData({ ...data });
    }

    return {
        attr: {
            value: getNestedValue(data, field),
            onChange
        },
        event: {
            setValue,
            reset
        }
    };
}, 'useTextContextBind')

/**
 * Input Radio 타입의 값으로 양방향 바인딩 처리하는 훅
 * 
 * @param {Object} initData [필수] 사용할 radio 데이터의 초기값
 * @param {String} initData.initValue [선택] radio 데이터의 초기 선택 값. 기본값은 빈값('')
 * @param {String} initData.values [필수] radio 옵션들의 값과 텍스트 목록. 형태 = {value: 'value', text: 'text'}. text값이 없다면 value 값을 참조한다.
 */
export const useRadioBind = HOF((initData) => {

    if (!initData || !initData.values) {
        throw new Error('Required useRadioBind params....');
    }

    const [radioData, setRadioData] = useState({
        selectedValue: initData.initValue ? initData.initValue : '',
        options: []
    });

    const handleChange = item => {
        radioData.selectedValue = item.value;

        radioData.options.forEach(option => {
            option.attr.checked = option.attr.value === item.value;
        });

        setRadioData({...radioData});
    };

    const setSelectedValue = val => {
        radioData.selectedValue = val;

        radioData.options.forEach(option => {
            option.attr.checked = option.attr.value === val;
        });

        setRadioData({...radioData});
    }

    // state 셋팅
    useEffect(() => {
        // options 초기 셋팅
        initData.values.forEach(item => {
            radioData.options.push({
                attr: {
                    value: item.value,
                    checked: item.value === radioData.selectedValue,
                    onChange: () => handleChange(item)
                },
                text: item.text ? item.text : item.value
            });
        });

        setRadioData({ ...radioData });
    }, []);

    return { radioData, setSelectedValue };
}, 'useRadioBind');

/**
 * Input Checkbox 타입의 값으로 양방향 바인딩 처리하는 훅
 * 
 * @param {Object} initData [필수] 사용할 checkbox 데이터의 초기값
 * @param {Array} initData.initCheckedList [선택] 초기에 체크해놓을 목록
 * @param {String} initData.values [필수] checkbox 옵션들의 값과 텍스트 목록. 형태 = {value: 'value', text: 'text'}. text값이 없다면 value 값을 참조한다.
 */
export const useCheckboxBind = HOF((initData) => {
    if (!initData || !initData.values) {
        throw new Error('Required useCheckboxBind params....');
    }

    const [ checkboxData, setCheckboxData ] = useState({
        refData: {
            checkedList: initData.initCheckedList ? initData.initCheckedList : [],
            options: []
        }
    });

    const isChecked = (item) => {
        return checkboxData.refData.checkedList.indexOf(item.value) > -1;
    }

    const checkAll = isChecked => {
        const tempCheckedList = [];
        checkboxData.refData.options.forEach(option => {
            tempCheckedList.push(option.value);
            option.attr.checked = isChecked;
        });

        if (isChecked) {
            checkboxData.refData.checkedList = tempCheckedList;
        } else {
            checkboxData.refData.checkedList = [];
        }

        setCheckboxData({...checkboxData});
    }

    // state 셋팅
    useEffect(() => {
        // options 초기 셋팅
        initData.values.forEach(item => {
            const option = {
                attr: {
                    checked: isChecked(item)
                },
                value: item.value,
                text: item.text ? item.text : item.value
            }

            option.attr.onChange = () => {
                option.attr.checked = !option.attr.checked;
                const index = checkboxData.refData.checkedList.indexOf(item.value);
                const has = index > -1;

                if (option.attr.checked && !has) {
                    checkboxData.refData.checkedList.push(option.value);

                } else if (!option.attr.checked && has) {
                    checkboxData.refData.checkedList.splice(index, 1);
                }

                setCheckboxData({ ...checkboxData });
            };

            checkboxData.refData.options.push(option);
        });

        setCheckboxData({ ...checkboxData });
    }, []);

    return { 
        checkboxData: checkboxData.refData, 
        checkAll 
    };

}, 'useCheckboxBind');