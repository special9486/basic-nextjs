import CustomLink from "@/components/com/CustomLink";
import Layout from "@/components/com/Layout";
import ComponentInitializer from "@/utils/ComponentInitializer";
import { useState } from "react";
import { useTextValueBind } from "@/hooks/useInputTextBind";

const { HOF } = ComponentInitializer.init('DataBindInputText');

const inputTextStyle = {
    width: '100%'
};

export default HOF(() => {
    // 기본적인 양방향 바인드용 데이터
    const [ basicValue, setBasicValue ] = useState('기본적인 양방향 바인드 셈플');
    const changeBasicValue = event => {
        setBasicValue(event.target.value);
    };

    // hook을 이용한 양방향 바인드용 데이터
    const hookData = useTextValueBind('hook을 이용한 양방향 바인드 셈플');
    const initHookData = () => {    // hookData 초기 값으로 셋팅
        hookData.event.reset();
    };
    const changeHookData = () => {  // 원하는 값으로 hookData 변경
        hookData.event.setValue('스크립트로 변경한 hookData');
    };

    return (
        <Layout>
            <h1>input text에 양방향 데이터 바인딩 셈플</h1>
            <br/>
            <div style={{border: '1px solid black', padding: '10px 10px'}}>
                <h3>Bind된 데이터 출력</h3>
                <div>- basicValue: {basicValue}</div>
                <div>- hookData: {hookData.attr.value}</div>
            </div>
            <br/><br/>
            <input type="text" style={inputTextStyle} value={basicValue} onChange={changeBasicValue} />
            <br/><br/>
            <input type="text" style={inputTextStyle} {...hookData.attr} /><br/>
            <button onClick={initHookData}>hookData 초기화</button>&nbsp;&nbsp;
            <button onClick={changeHookData}>hookData 변경</button>

            <br/><br/>
            <CustomLink href="/samples/com/dataBind/DataBindMain">데이터 바인딩 셈플 메인 화면으로...</CustomLink>

        </Layout>
    )
});