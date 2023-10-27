import ComponentInitializer from "@/utils/ComponentInitializer";
import _ from 'lodash';

const { Log, HOF } = ComponentInitializer.init('Layout');


const DefaultLayout = ({children}) => {
    return (
        <div>
            <div><h1>Header</h1></div>
            <div>{children}</div>
            <div><h2>Bottom</h2></div>
        </div>
    )
};


export default HOF(({children, name}) => {
    name = _.defaultTo(name, 'default');
    Log.info(`Layout name is ${name}`);

    const LayoutComponent = name === 'default' ? DefaultLayout : null;
    
    if (LayoutComponent === null) {
        throw new Error(`"${name}" is not supported layout name.`);
    }

    return (
        <LayoutComponent>
            {children}
        </LayoutComponent>
    )
})