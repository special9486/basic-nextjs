import ComponentInitializer from "@/utils/ComponentInitializer";

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

export default HOF(({ children }) => {
    return (
        <div style={modalOverlayStyle}>
            <div style={modalWrapperStyle} aria-modal="true" aria-hidden="false" tabIndex={-1} role="dialog">
                {children}
            </div>
        </div>
    )
});