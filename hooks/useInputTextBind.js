import { useState } from 'react';
import { getNestedValue, setNestedValue } from '@/utils/ObjectUtils';
import ComponentInitializer from "@/utils/ComponentInitializer";

const { HOF } = ComponentInitializer.init('useInputTextBind');

export const useTextValueBind = HOF(initialValue => {
    const [value, setValue] = useState(initialValue);

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

export const useTextContextBind = HOF((context, field) => {
    const [ data, setData ] = context; 
    const initialValue = getNestedValue(data, field);

    const onChange = (e) => {
        setNestedValue(data, field, e.target.value);
        setData({...data});
    };

    const reset = () => {
        setNestedValue(data, field, initialValue);
        setData({...data});
    };

    const setValue = val => {
        setNestedValue(data, field, val);
        setData({...data});
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