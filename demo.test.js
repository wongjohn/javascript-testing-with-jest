/**
 * 下面是 Jest 的一个"测试用例"的例子
 * test方法是Jest注入的方法，使用它定义一个"测试用例"
 * （1）第一个参数，是测试用例的说明
 * （2）第二个参数，是测试用例的代码实现
 *     【注意：
 *          如果方法的"返回值"是一个"Promise"——比如使用await关键字修饰，
 *          Jest会等待当前的测试用例执行完毕，
 *          再继续执行其他的测试用例。
 *      】
 */
test('期待"1 + 2"的结果为"3"', () => {
    expect(1 + 2).toBe(3);
});

/**
 * 下面是使用 puppeteer 的一个例子
 */
const puppeteer = require('puppeteer');
// 第一个参数是"测试用例"说明，第二个是测试用例代码实现
test('测试使用百度检索搜索"Puppeteer"关键字', async() => {
    // 1、打开 浏览器
    const browser = await puppeteer.launch({headless: true});
    // 2、打开 新页面
    const page = await browser.newPage();
    // 3、网址跳转到 百度
    await page.goto('https://www.baidu.com');
    // 4、在 百度的搜索框 输入 Puppeteer
    await page.type('#kw', 'Puppeteer', {delay: 50});
    // 5、点击 "百度一下" 按钮
    await page.click('#su');

    // 6、等待 1秒钟，等待百度传输结果
    await page.waitFor(1000);

    // 7、抽取所有结果的"标题"和"链接"
    const links = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('.c-container h3.t a'));
        return anchors.map(anchor => anchor.textContent);
    });

    // 8、期待有结果
    expect(links.length).not.toBe(0);
    expect(links.length).toBeTruthy();

    // 9、关闭浏览器
    await browser.close();
});
