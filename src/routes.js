import AdminLogIn from './components/AdminLogIn'
import Home from './components/Home'
import AdminTemplate from './components/AdminTemplate'

export const routes = [
    {path: '', component: Home},
    {path: '/admin', component: AdminLogIn},
    {path: '/admin_home', component: AdminTemplate}
];


