import ComponentInitializer from "@/utils/ComponentInitializer";
import StoreCore from "@/store/StoreCore";
import useCore from "@/hooks/useCore";

const { HOF } = ComponentInitializer.init('ModalConfirm');

const alertStyle = {
    width: '500px',
    background: 'white',
    padding: '20px',
    zIndex: '100',
    borderRadius: '8px'
}

export default HOF(({layerIndex, callbackFunc, message}) => {
    useCore({ storeList: [StoreCore] });
    const { removeLayer } = StoreCore.getState();

    const btnClick = HOF((result) => {
        removeLayer(layerIndex);
        callbackFunc(result);

    }, 'btnClick');

    return (
        <div style={alertStyle}>
            <p>{message}</p>
            <div>
                <button onClick={() => btnClick(false)}>취소</button> &nbsp;&nbsp; 
                <button onClick={() => btnClick(true)}>확인</button>
            </div>
        </div>
    )
});