/**
 * 测试登录、退出
 * 下面是组合Jest、Puppeteer进行"功能测试"的例子
 */
jest.setTimeout(30000);/*超时默认是5000(5秒)*/

const puppeteer = require('puppeteer');
const alphaConfig = {
    host:'https://dev.alphalawyer.cn/',
    userName:'USER_NAME',
    password:'PASSWORD'
};

let browser, page;
// 在所有"测试用例"之前执行，进行"资源创建"等等操作
beforeAll(async () => {
    browser = await puppeteer.launch(); // 打开浏览器
    page = await browser.newPage(); // 打开新页面
    await page;
});
// 在所有"测试用例"之后执行，进行"资源销毁"等等操作
afterAll(async () => {
    await browser.close(); // 关闭浏览器
});

test('测试登录', async () => {
    // 进入密码登录页面
    await page.goto(`${alphaConfig.host}#/login/password`);

    // 等待表单出现
    await page.waitForSelector('form[name="loginForm"]');
    await page.type('input[name="username"]', alphaConfig.userName, {delay: 50}); // 输入用户名
    await page.type('input[name="account_password"]', alphaConfig.password, {delay: 50}); // 输入密码

    const navigationPromise = page.waitForNavigation(); // 点击 "进入Alpha" 按钮，期待会有一次页面跳转
    await page.click('.login-button'); // 点击 "进入Alpha" 按钮
    await navigationPromise; // 期待页面跳转结束

    expect(page.url()).toBe(`${alphaConfig.host}#/app/my/task`); // 页面应该会跳转到"我的"=>"任务"页面
    await page.waitForNavigation();// 页面URL意外地有另一次跳转
    await expect(page.url()).toBe(`${alphaConfig.host}#/app/my/task/list`); // 页面跳转到"我的"=>"任务"列表页面
});

test('测试退出', async () => {
    await page.click('.v3-header-nav .tip-setting span'); // 继续点击页面右上角的"设置"按钮
    await page.waitForSelector('.getSettingBlock', {visible: true}); // 等待 弹出窗 弹出来

    const navigationPromise = page.waitForNavigation(); // 点击 "退出" 按钮，期待会有一次页面跳转
    await page.click('.getSettingBlock .ns-popover-tooltip li:nth-child(6)'); // 点击 "退出" 按钮
    await navigationPromise; // 等待页面跳转结束

    await expect(page.url()).toBe(`${alphaConfig.host}#/login/wechat`); // 期待跳转到"登录"页面
});

