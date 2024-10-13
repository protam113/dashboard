
import Login from "../pages/Auth/Login";
import Document from "../pages/Document/Document";
import CreateDocument from "../pages/Document/createDocumet";
import UpdateDocument from "../pages/Document/updateDocument";
import Managers from "../pages/Managers/Manager";
import createManager from "../pages/Managers/createManager";
import Messages from "../pages/Message/message";
import New from "../pages/News/New";
import createNew from "../pages/News/createNew";
import updateNew from "../pages/News/updateNew";
import Profile from "../pages/Profile/Profile";
import CreateAdmin from "../pages/Profile/createAdmin";
import Service from "../pages/Service/Service";
import createService from "../pages/Service/createService";
import UpdateService from "../pages/Service/updateService";
import User from "../pages/Users/User";
import createUser from "../pages/Users/createUser";
import Home from "../pages/dashboard"
import createProduct from "../pages/products/createProduct";
import Product from "../pages/products/product";
import UpdateProduct from "../pages/products/updateProduct";
import CreateInfoPage from "../pages/setting/createInfo";
import setting from "../pages/setting/setting";
import updateInfo from "../pages/setting/updateInfo";
import createSolution from "../pages/solution/createSolution";
import Solution from "../pages/solution/solution";

const publicRoutes = [
    { path: '/', component: Home},
    { path: '/profile', component: Profile},
    { path: '/create_admin', component: CreateAdmin},

    { path: '/setting', component: setting},
    { path: '/create_info', component: CreateInfoPage},
    { path: '/update_info/:id', component: updateInfo},

    { path: '/message', component: Messages},

    { path: '/solution', component: Solution},
    { path: '/create_solution', component: createSolution},

    { path: '/manager', component: Managers},
    { path: '/create_manager', component: createManager},

    { path: '/user', component: User},
    { path: '/create_user', component: createUser},
    
    { path: '/product', component: Product},
    { path: '/create_product', component: createProduct},
    { path: '/update_product/:id', component: UpdateProduct},

    { path: '/new', component: New},
    { path: '/create_new', component: createNew},
    { path: '/update_new/:id', component: updateNew},

    { path: '/document', component: Document},
    { path: '/create_document', component: CreateDocument},
    { path: '/update_document/:id', component: UpdateDocument},
    
    { path: '/service', component: Service},
    { path: '/create_service', component: createService},
    { path: '/update_service/:id', component: UpdateService},



    // auth
    { path: '/login', component: Login, layout: null },
];

const privateRoutes = [];

export {publicRoutes, privateRoutes}