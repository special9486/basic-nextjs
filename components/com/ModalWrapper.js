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



export default HOF(({ children }) => {
    useCore({ storeList: [StoreCore] });

    return (
        <div style={modalOverlayStyle}>
            {children}
        </div>
    )
});