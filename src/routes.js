import AdminLogIn from './components/AdminLogIn'
import Commodities from './components/Commodities'
import AdminTemplate from './components/AdminTemplate'
import Home from './components/Home'
import Commodity from './components/Commodity'
import Registration from './components/Registration'

export const routes = [
	{path: '/fairytrip/', component: Home},
	{path: '/fairytrip/admin', component: AdminLogIn},
	{path: '/fairytrip/admin_home', component: AdminTemplate},
	{path: '/fairytrip/registration', component: Registration},
	{path: '/fairytrip/:commodity/', component: Commodities},
	{path: '/fairytrip/:commodity/:id', component: Commodity}
];


