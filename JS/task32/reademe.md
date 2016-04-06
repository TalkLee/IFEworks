#2016.4.6

#学习其他团队的编码思路中

#设计如下：
config:{
  form_items
  [
  form_item1{
  label: 输入框前面的标签
  element:  "input"/select/radio/checkbox
  type: "text"/password....

  表单验证规则:
  validator: function或者仅提供正则表达式

  message:
  {
    rule:"必填，长度4-16字符” //填写规则
    empty: label + "不能为空" //为空提示
    tooshort: "不能少于" + minlength + "字符"
    toolong:"不能超过" + maxlength + "字符"
    minlength:字符串最小长度
    maxlength:字符串最大长度
    placeholder://未获取焦点时表单占位字符串
    necessary://是否必填
  }
  },
  form_item2{
    .......
  }
  ]}
