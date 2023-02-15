import { fetchPermission } from "../../api/index"
import router,{ DynamicRoutes } from "../../router/index"
import dynamicRouter from "../../router/dynamic-router"
import { recursionRouter,setDefaultRoute } from "../../utils/recursion-router"

export default {
    namespaced:true,
    state:{
        permissionList:null,
        sidebarMenu:[],// 导航菜单
        currentMenu:'' // 高亮
    },
    getters:{},
    mutations:{
        SET_PERMISSION(state,routes){
            state.permissionList = routes;
        },
        CLEAR_PERMSSION(state){
            state.permissionList = null;
        },
        SET_MENU(state,menu){
            state.sidebarMenu = menu;
        },
        CLEAR_MENU(state){
            state.sidebarMenu = []
        }
    },
    // 异步访问
    actions:{
        async FETCH_PERMISSION({ commit,state }){
            console.log(DynamicRoutes)
            let permissionList = await fetchPermission();
            // 筛选
            let routes = recursionRouter(permissionList,dynamicRouter);
            let MainContainer = DynamicRoutes.find(v => v.path === "");
            let children = MainContainer.children;
            children.push(...routes)

            // 生成菜单
            commit("SET_MENU",children);

            // 设置默认路由
            setDefaultRoute([MainContainer]);
            // 初始化路由
            let initialRoutes = router.options.routes;
            console.log("🚀 ~ file: permission.js:46 ~ FETCH_PERMISSION ~ DynamicRoutes", DynamicRoutes)
            router.addRoutes(DynamicRoutes);
            commit("SET_PERMISSION",[ ...initialRoutes , ...DynamicRoutes])
        }
    }
}