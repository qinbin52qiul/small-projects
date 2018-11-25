$(function () {
  'use strict'

  /* 选中页面中所有的 input[data-rule] */
  var $inputs = $('[data-rule]'),
    $form = $('#signup'),
    inputs = []
  $inputs.each(function (index, node) {
    /* 解析每一个 input 的验证规则 */
    var tmp = new Input(node)
    inputs.push(tmp)
  })

  $form.on('submit', function (e) {
    e.preventDefault()
    $inputs.trigger('blur')

    for (var i = 0; i < inputs.length; i++) {
      var item = inputs[i]
      var r = item.validator.is_valid()
      if (!r) {
        alert('invalid')
        return;
      }
    }

    // signup()
    // 所有信息都已填写正确
    alert('注册成功')
  })

  /* 与服务器通信 */
  function signup() {
    // $.post('/api/signup', {})

  }

  /* 验证 */
  /* var test = new Input('#test')
  var valid = test.validator.is_valid()
  console.log('valid :', valid); */

  /*
    var validator = new Validator('', {
      max: 100,
      min: 18,
      maxlength: 5,
      pattern: '^[a-zA-Z0-9]*$'
    })

    // var result = validator.validate_max()
    // var result = validator.validate_min()
    // var result = validator.validate_maxlength()
    // var result = validator.validate_numeric()
    // var result = validator.validate_required()
    var result = validator.validate_pattern()
    console.log('result :', result);
  */


})