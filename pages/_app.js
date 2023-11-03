import ComponentInitializer from "@/utils/ComponentInitializer";
import StoreCore from "@/store/StoreCore";
import useCore from "@/hooks/useCore";
import { useEffect } from "react";
import { useRouter } from "next/router";
import _ from 'lodash';

import ModalWrapper from "@/components/com/ModalWrapper";

const { HOF } = ComponentInitializer.init('_app.js');

const App = HOF(({ Component, pageProps }) => {
    if (pageProps.initData) {
        // TODO initData 에 값이 들어 있을 경우 초기 데이터를 셋팅한다.
    }

    const { layerList, closeLastLayer } = StoreCore.getState();
    const router = useRouter();

    // store subscribe 
    const core = useCore({ storeList: [StoreCore] });

    // 뒤로가기 제어
    useEffect(() => {
        const nowUrl = router.pathname;
        const nowState = _.cloneDeep(history.state);

        const handleBeforePopState = HOF(() => {
            const goBackFunction = core.getGoBackFunction();
            if (layerList.length > 0) {
                history.pushState(nowState, '', nowUrl);
                closeLastLayer();

                return false;

            } else if (typeof goBackFunction === 'function') {
                history.pushState(nowState, '', nowUrl);
                goBackFunction();

                return false;

            } else {
                return true;
            }

        }, 'handleBeforePopState');

        router.beforePopState(handleBeforePopState);

        return () => {
            router.beforePopState(null);
        };

    }, [router, layerList, core, closeLastLayer]);

    return (
        <div>
            <div aria-hidden={layerList.length === 0 ? 'false' : 'true'}>
                <Component {...pageProps} />
            </div>
            
            <br /><hr /><br />
            
            {layerList.map((item, index) => (
                <ModalWrapper key={index} layerIndex={index}>
                    <item.layerComponent layerIndex={index} callbackFunc={item.callbackFunc} {...item.layerProps} />
                </ModalWrapper>
            ))}
        </div>
    );
});

/**
 * 모든 페이지에서 필요한 초기화 작업 진행
 */
App.getInitialProps = async ({ctx}) => {
    let initData = null;

    // 아래 조건은 초기 페이지 로드시나 getServerSideProps를 사용한 페이지에서만 실행된다.
    if (typeof window === 'undefined') {
        initData = {
            userAgent: ctx.req.headers['user-agent']
        }
    }

    return {
        pageProps: {
            initData
        }
    }
};

export default App;