# lib 基于jQuery的插件，需先引入jQuery

## linkage 城市四级联动
### 使用方法：
+ 引入css文件
+ <link rel="stylesheet" href="/lib/linkage/city-linkage.css">
+ 引入js文件
+ <script src="/lib/linkage/city-linkage.js"></script>
+ 在需要的位置放置一个id为city-linkage的div
+ <div id="city-linkage"></div>
+ 使用cityLinkage
+ cityLinkage();
+ 可传入默认城市信息
+ cityLinkage({
+   province: '安徽省',
+   city: '合肥市',
+   county: '包河区',
+   street: '望湖街道'
+ });
+ 获取选中的城市信息
+ var data = cityLinkage('getData');

paginate 分页
引入css文件
<link rel="stylesheet" href="/lib/paginate/paginate.css">
引入js文件
<script src="/lib/paginate/paginate.js"></script>
在需要的位置放置一个id为paginate的div
<div id="paginate"></div>
使用paginate
var paginate = paginate();
paginate({
  page: 1,    #当前页
  limit: 10,  #每页条数
  count: 100, #总条数
  callback: function(currentPage){
    #拿到当前页数后发送ajax请求数据
    #请求数据完成后重新渲染
    paginate(true)
  }
});
如果一个页面中多个地方需要用到分页，可自定义id，后传人需要id名
<div id="paginate1"></div>
<div id="paginate2"></div>

var paginate1 = paginate();
paginate1({
  element: '#paginate1'
  ...
});
var paginate2 = paginate();
paginate2({
  element: '#paginate2'
  ...
});

regexp 正则验证
引入js
<script src="/lib/regexp/regexp.js"></script>
使用
regexp.check(rule, string);
也可验证长度
regexp.check(rule[min,max], string);
验证通过将返回true，否则返回false
例 5-10个数字
regexp.check('number[5,10]', '012345')  #返回true
内置规则如下
    // 数字
    number: /^[0-9]*$/,
    // 非0开头最多两位小数的数字
    price: /^([1-9][0-9]*)+(.[0-9]{1,2})?$/,
    // 字母
    alpha: /^[A-Za-z]+$/,
    // 字母和数字
    alphaNum: /^[A-Za-z0-9]+$/,
    // 字母、数字和下划线
    alphaDash: /^\w+$/,
    // 汉字
    chs: /^[\u4e00-\u9fa5]{0,}$/,
    // 汉字、字母和数字
    chsAlphaNum: /^[\u4e00-\u9fa5A-Za-z0-9]+$/,
    // 汉字、字母、数字和下划线
    chsDash: /^[\u4e00-\u9fa5A-Za-z0-9_]+$/,
    // 姓名
    name: /(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{0}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{0}$)/,
    // 手机号
    phone: /^1[3-9]\d{9}$/,
    // 身份证号
    ID: /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,
    // 邮箱
    email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
    // QQ号
    qq: /^[1-9][0-9]{4,}$/,
    // 账号/微信号 6~20个字母、数字、下划线或减号，以字母开头
    account: /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/,
    // 简单密码 6~18位字母、数字或下划线
    simPass: /^\w{6,18}$/,
    // 复杂密码 8~18位字母、数字或下划线，以字母开头，必须包含字母和数字
    // (?=.*\d)断言，该位置后肯定有数字
    // (?![0-9]+$)断言，该位置后不全是数字
    comPass: /^[a-zA-Z](?=.*\d)[_0-9a-zA-Z]{7,17}$/,
可自行在js文件中添加，或在调用check方法前临时添加一个规则，如
regexp.set({
  nonzero: /^[1-9]*$/
});
regexp.check('nonzero[5,10]', '012345') #返回false
