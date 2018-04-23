/*
    定义 calculate () 函数 在HTML view中绑定事件处理程序时调用
    从 input 中读取数据 计算贷款赔付信息 并将数据结果显示在 span 元素中
    保存用户数据 展示放贷人链接 绘制图表

*/

function calculate() {
    // 文档中用于输入输出的元素
    let amount = document.getElementById("amount")
    let apr = document.getElementById("apr")
    let years = document.getElementById("years")
    let zipcode = document.getElementById("zipcode")
    let payment = document.getElementById("payment")
    let total = document.getElementById("total")
    let totalinterest = document.getElementById("totalinterest")

    let principal = parseFloat(amount.value) // 假设所有的输入内容均合法 从 input 元素中获取输入数据
    let interest = parseFloat(apr.value) / 100 / 12 // 将百分比格式转换为小数格式 并从年利率转换为月利率
    let payments = parseFloat(years.value) * 12 // 将年度赔付转换为月度赔付

    // 计算月度赔付
    let x = Math.pow(1 + interest, payment) // 幂运算
    let monthly = (principal * x * interest) / (x - 1)

    // isFinite -> 检测参数是否无穷大
    if (isFinite(monthly)) {

        // toFixed -> 将 number 四舍五入为指定小数位数的数字
        payment.innerHTML = monthly.toFixed(2)
        total.innerHTML = (monthly * payments).toFixed(2)
        totalinterest.innerHTML = ((monthly * payments) - principal).toFixed(2)

        // 保存输入数据 以便下次访问
        save(amount.value, apr.value, years.value, zipcode.value)

        // 找到并展示本地放贷人 忽略网络错误
        try {
            // 捕捉这段代码抛出的所有异常
            getLenders(amount.value, apr.value, years.value, zipcode.value)
        } catch (e) { /* 忽略这些异常 */ }

        chart(principal, interest, monthly, payments) // 用图表展示贷款金额、利息、资产收益

    } else {

        // 清空元素的文本内容
        payment.innerHTML = ""
        total.innerHTML = ""
        totalinterest.innerHTML = ""
        chart() // 无数据则清楚图表
    }
}