/**
 * Created by yuanwen on 2016/12/7.
 */
+(function ($) {
  var hook='[data-role="toggleTab"]';
  var active='active';


  function ToggleTab($ele, opts) {
    var self = this;
    this.$ele = $ele;
    this.$wrap=$($ele.attr('data-for'));
    this.defaults = {};
    this.options = $.extend({}, this.defaults, opts);

    var eventOpt=$ele.attr('data-event');
    var bindEvent=eventOpt == 'hover' ? 'mouseenter' :
                  eventOpt == 'click' ? 'click'      :   
                  'mouseenter click';

    var activeNode=$ele.children('.'+active)[0];
    var listName=activeNode.tagName.toLowerCase();
    this.$lists=$ele.children(listName);

    this.$lists.on(bindEvent,_change);
    _change.call(activeNode)

    function _change(event){
      var $this=$(this);
      self.changeActive($this);
      self.changeContent(self.$lists.index($this));
    }

  }

  var fn = ToggleTab.prototype;

  fn.changeActive=function($li){
    this.$lists.removeClass(active);
    $li.addClass(active);
  };

  fn.changeContent=function(index){
    this.$wrap
      .children().css('display','none')
      .eq(index).css('display','block');
  };

  $.fn.toggleTab = function (opts) {
    return this.each(function () {
      new ToggleTab($(this), opts);
    })
  };

  $(function(){
    $(hook).toggleTab();
  })


})(window.jQuery);
