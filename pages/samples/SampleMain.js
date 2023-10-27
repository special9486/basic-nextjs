import ComponentInitializer from "@/utils/ComponentInitializer"
import Layout from "@/components/com/Layout"

const { HOF } = ComponentInitializer.init('SampleMain');

export default HOF(() => {
    return (
        <Layout name={'default'}>
            <h1>This is Sample Main Page</h1>
        </Layout>
    )
});