import ComponentInitializer from "@/utils/ComponentInitializer";
import StoreCore from "@/store/StoreCore";
import useCore from "@/hooks/useCore";
import { initLayerContextData, LayerContext } from "@/pages/_app";
import { useEffect, useState } from "react";

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



export default HOF(({ children, layerIndex }) => {
    useCore({ storeList: [StoreCore] });
    const [ layerContextData, setLayerContextData ] = useState({...initLayerContextData});
    const { layerList } = StoreCore.getState();
    let lastFocusElement = null;

    useEffect(() => {
        // layerList를 체크하여 페이지 레이어 컨텍스트의 ariaHidden 값을 변경 한다.
        layerContextData.ariaHidden = (layerList.length - 1) === layerIndex ? 'false' : 'true';
        setLayerContextData({...layerContextData});

    }, [layerList.length]);


    useEffect(() => {
        lastFocusElement = document.activeElement;
        return () => {
            if (lastFocusElement) {
                lastFocusElement.focus();
            }
        }
    }, []);

    return (
        <div style={modalOverlayStyle}>
            <LayerContext.Provider value={[layerContextData, setLayerContextData]}>
                {children}
            </LayerContext.Provider>
        </div>
    )
});