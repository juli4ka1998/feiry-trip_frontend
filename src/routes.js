import AdminLogIn from './components/AdminLogIn'
import Commodities from './components/Commodities'
import AdminTemplate from './components/AdminTemplate'
import Home from './components/Home'
import Commodity from './components/Commodity'
import Registration from './components/Registration'
import LogIn from './components/LogIn'
import User from './components/User'
import Cropper from './components/Cropper'
import Payment from './components/Payment'

export const routes = [
	{path: '/fairytrip/', component: Home},
	{path: '/fairytrip/admin', component: AdminLogIn},
	{path: '/fairytrip/adminHome', component: AdminTemplate},
	{path: '/fairytrip/registration', component: Registration},
	{path: '/fairytrip/cropp', component: Cropper},
	{path: '/fairytrip/payment', component: Payment},
	{path: '/fairytrip/login', component: LogIn},
	{path: '/fairytrip/user', component: User},
	{path: '/fairytrip/:commodity/', component: Commodities},
	{path: '/fairytrip/:commodity/:id', component: Commodity}
];


