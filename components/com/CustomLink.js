import ComponentInitializer from "@/utils/ComponentInitializer";
import useCore from "@/hooks/useCore";

const { HOF } = ComponentInitializer.init('CustomLink');

export default HOF(({children, href, className}) => {
    const core = useCore();

    const clickEvent = HOF((event) => {
        event.preventDefault();
        core.goPage(href);
    }, 'clickEvent');

    return (
        <a href={'#'} className={className} onClick={clickEvent}>{children}</a>
    )
});