/*

    用户输入数据会保存至 localStorage 对象中
    当再次访问 数据依然存在原位置
    通过 file://URL 打开本地文件 无法使用存储功能

*/

function save(amount, apr, years, zipcode) {

    // 当浏览器支持时运行此处代码
    if (window.localStorage) {

        // localStorage -> 本地存储
        localStorage.loan_amount = amount
        localStorage.loan_apr = apr
        localStorage.loan_years = years
        localStorage.loan_zipcode = zipcode
    }
}

// 在文档首次加载时 尝试还原输入字段
window.onload = function() {

    // 如果浏览器支持本地存储 && 上次保存的值存在
    if (window.localStorage && localStorage.loan_amount) {
        document.getElementById("amount").value = localStorage.loan_amount
        document.getElementById("apr").value = localStorage.loan_apr
        document.getElementById("years").value = localStorage.loan_years
        document.getElementById("zipcode").value = localStorage.loan_zipcode
    }
}

function getLenders(amount, apr, years, zipcode) {
    if (!ad) return // 返回为空 则退出

    // 将用户输入的数据进行 URL 编码 并作为查询参数附在 URL 中
    let url = "getLenders.php" + // 处理数据的 URL 地址  使用查询串中的数据
        "?amt=" + encodeURIComponent(amount) +
        "&apr=" + encodeURIComponent(apr) +
        "&yrs=" + encodeURIComponent(years) +
        "&zip=" + encodeURIComponent(zipcode)

    // 通过XMLHttpRequest对象提取返回数据
    let req = new XMLHttpRequest() // 发起一个新的请求
    req.open("GET", url) // 通过 URL 发起一个 HTTP GET 请求
    req.send(null) // 不带任何正文发送这个请求

    req.onreadystatechange = function() {

    }
}