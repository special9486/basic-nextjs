import ComponentInitializer from "@/utils/ComponentInitializer"
import Layout from "@/components/com/Layout"
import CustomLink from "@/components/com/CustomLink";

const { HOF } = ComponentInitializer.init('SampleMain');

export default HOF(() => {
    return (
        <Layout name={'default'}>
            <h1>This is Sample Main Page</h1>
            <br/>
            <CustomLink href={'/samples/com/movePage/MovePageOne'}>페이지 이동 및 데이터(파라미터) 전달 셈플<br/>(/samples/com/movePage/MovePageOne)</CustomLink>
            
            <br/><br/>
            <CustomLink href={'/samples/com/dataBind/DataBindMain'}>Input text, selectbox, radio, textarea에 대한 양방향 데이터 바인드<br/>(/samples/com/dataBind/DataBindMain)</CustomLink>

            <br/><br/>
            <CustomLink href={'/samples/com/backBtn/BackBtnControll'}>브라우저 뒤로가기 버튼 제어<br/>(/samples/com/backBtn/BackBtnControll)</CustomLink>
        </Layout>
    )
});