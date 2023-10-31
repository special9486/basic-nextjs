import ComponentInitializer from "@/utils/ComponentInitializer";
import storeCore from "@/store/StoreCore";
import useCore from "@/hooks/useCore";
import { useEffect } from "react";
import { useRouter } from "next/router";
import _ from 'lodash';

const { Log, HOF } = ComponentInitializer.init('_app.js');

const App = HOF(({ Component, pageProps }) => {
    const router = useRouter();
    const { layerList, closeLastLayer } = storeCore.getState();

    // store subscribe 
    const core = useCore({storeList: [storeCore]});

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

    }, [router, layerList]);

    return (
        <div>
            <Component {...pageProps} />
            <br/><hr /><br/>
            {layerList.map((item, index) => (
                <div key={index}>[layer {index + 1} 데이터: {JSON.stringify(item)}]</div>
            ))}
        </div>
    );
});

App.getInitialProps = HOF(async context => {
    if (typeof window === 'undefined') {
        Log.info('여기에 페이지 초기화에 필요한 로직 처리 등록');
        return {
            props: {
                initialData: 'abc'
            }
        };

    } else {
        return {};
    }

}, 'getInitialProps');

export default App;