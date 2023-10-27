import { useEffect } from 'react';
import ComponentInitializer from "@/utils/ComponentInitializer";
import useCore from './useCore';

import _ from 'lodash';

const { HOF } = ComponentInitializer.init('useBackBtnInterceptor');

export default HOF((func) => {
    const core = useCore();

    useEffect(HOF(() => {
        core.setGoBackFunction(func);
        
        return () => {
            core.setGoBackFunction(null);
        }
    }, 'useEffect'), []);
})
