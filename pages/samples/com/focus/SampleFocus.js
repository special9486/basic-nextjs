import Layout from "@/components/com/Layout";
import ComponentInitializer from "@/utils/ComponentInitializer";
import useCore from "@/hooks/useCore";
import { useRef } from "react";
import { useTextValueBind } from "@/hooks/useDataBind";

const { HOF } = ComponentInitializer.init('SampleFocus');

const PopupContents = HOF(() => {
    const confirmBtn = useRef();
    const core = useCore();

    const inputOne = useTextValueBind('popup input 1');
    const inputTwo = useTextValueBind('popup input 2');

    const showConfirm = () => {
        core.confirm('show confirm....').then(() => {
            confirmBtn.current.focus();
        });
    }

    return (
        <div>
            <p>Popup Contents</p>
            <br/>

            <input type="text" {...inputOne.attr} />

            <br/><br/>
            <input type="text" {...inputTwo.attr} />

            <br/><br/>
            <button ref={confirmBtn} onClick={showConfirm}>confirm 띄우기</button>
        </div>
    );
});

export default HOF(() => {
    const core = useCore();
    const inputOne = useTextValueBind('input 1');
    const inputTwo = useTextValueBind('input 2');

    const refButton = useRef();

    const showPopup = HOF(async () => {
        await core.showBottomPopup(PopupContents);

        refButton.current.focus();

    }, 'showPopup')

    return (
        <Layout>
            <h1>Focus 처리 셈플</h1>

            <input type="text" {...inputOne.attr} />

            <br/><br/>
            <input type="text" {...inputTwo.attr} />

            <br/><br/>
            <button ref={refButton} onClick={showPopup}>팝업 띄우기</button>

        </Layout>
    )
});