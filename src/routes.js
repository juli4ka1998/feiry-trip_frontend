import AdminLogIn from './components/AdminLogIn'
import Home from './components/Home'
import AdminTemplate from './components/AdminTemplate'

export const routes = [
    {path: '/fairytrip', component: Home},
    {path: '/fairytrip/admin', component: AdminLogIn},
    {path: '/fairytrip/admin_home', component: AdminTemplate}
];


