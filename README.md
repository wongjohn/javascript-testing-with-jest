# javascript-testing-with-jest
JavaScript Testing with Jest

用户界面测试，使用了[Puppeteer](https://github.com/GoogleChrome/puppeteer)；
单元测试、代码组织、结果断言，使用了[Jest](https://facebook.github.io/jest/)。

## 安装、执行方法

```bash
# 建议使用cnpm进行安装，puppeteer需要下载Chromium (~170Mb Mac, ~282Mb Linux, ~280Mb Win)
sudo npm install -g cnpm jest

cnpm install

npm start
# npm run test
# jest
```

### 执行`demo.test.js`文件结果

![DEMO执行结果](/docs/javascript-testing-with-jest-demo.png)

### 执行所有文件结果

![执行所有文件结果](/docs/javascript-testing-with-jest-login.png)

### 在实际项目中，测试用例成功截图

![成功截图](/docs/success.jpg)

### 在实际项目中，测试用例失败截图

![失败截图](/docs/failure.jpg)

