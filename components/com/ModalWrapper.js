import ComponentInitializer from "@/utils/ComponentInitializer";
import StoreCore from "@/store/StoreCore";
import useCore from "@/hooks/useCore";

const { HOF } = ComponentInitializer.init('ModalWrapper');

const modalOverlayStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '1040',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const modalWrapperStyle = {
    zIndex: '1050',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

export default HOF(({ children, layerIndex }) => {
    useCore({ storeList: [StoreCore] });

    const { layerList } = StoreCore.getState();
    const lastIndex = layerList.length - 1;

    return (
        <div style={modalOverlayStyle}>
            <div style={modalWrapperStyle} aria-hidden={layerIndex === lastIndex ? 'false' : 'true'} tabIndex={-1} role="dialog">
                {children}
            </div>
        </div>
    )
});