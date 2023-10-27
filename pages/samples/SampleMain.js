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
        </Layout>
    )
});