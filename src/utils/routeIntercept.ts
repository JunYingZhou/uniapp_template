

const NEED_LOGIN_PAGES = [
    "/pages/index/index",
    "/pages/my/index",
    "/pages/charging/index",
];

const INTERCEPT_METHODS = ["switchTab", "navigateTo", "redirectTo", "reLaunch", "onLaunch"];

INTERCEPT_METHODS.forEach(method => {
    console.log(`路由拦截器已启动: ${method}`);

    uni.addInterceptor(method, {
        invoke(e) {
            const token = uni.getStorageSync('token');
            const url = e.url.split('?')[0];

            console.log(`拦截到路由跳转请求: ${url}`);

            if (NEED_LOGIN_PAGES.includes(url) && !token) {
                console.log('需要登录，跳转到登录页面');

                uni.showToast({
                    title: '请先登录',
                    icon: 'none'
                });

                uni.navigateTo({
                    url: "/pages/login/index"
                });

                // 阻止跳转
                return false;
            }

            console.log('不需要登录，允许跳转');
            return true;
        },
        fail(err) {
            console.error('拦截器失败:', err);
        }
    });
});
