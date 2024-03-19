import LayoutAdmin from '@/components/layouts/Admin/Layout'
import { ChefProvider } from '@/contexts/CheftContext'
import ListChef from './ListChef'
const Index = (): JSX.Element => {
    return (
        <LayoutAdmin>
            <ChefProvider>
                <ListChef />
            </ChefProvider>
        </LayoutAdmin>
    )
}
export default Index