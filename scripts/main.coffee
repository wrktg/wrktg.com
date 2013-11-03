(($, window) ->
  
  class ContentMenu
  
    defaults: 
      openClass:        "content-menu-open"      
      menuSelector:     ".menu-nav"
      contentSelector:  ".menu-content"
      buttonSelector:   "button"
      scrollSelector:   '.scrollbar'
      scrollHTML:       '<div class="scrollbar"></div>'

    constructor: (el, options) ->
      @options = $.extend {}, @defaults, options
      @$el           = $ el
      @$body         = $ "body"
      @$window       = $ window
      @$content      = $ @$el.find @options.contentSelector
      @$menu         = $ @$el.find @options.menuSelector
      @$button       = $ @$el.find @options.buttonSelector
      @init()

    init: ->
      @setup()
      @resize()
      @pullUp()

    setup: ->
      @$el.height @$menu.offset().top + @$menu.height()
      @$content.wrap @options.scrollHTML
      @$wrap = $ @$content.closest @options.scrollSelector
      @$wrap.perfectScrollbar()
      @$button.hammer().on "tap", => @toggleContent()

    resize: ->
      @offsetTop      = @$wrap.offset().top
      @windowHeight   = @$window.height()
      @containerHeight  = @windowHeight - @offsetTop
      @$wrap.height @containerHeight
      @contentHeight = @$content.height()
      @update()

    update: ->
      @$wrap.perfectScrollbar 'update'

    teardown: ->
      @$content.unwrap()

    toggleContent: ->
      if @$body.hasClass @options.openClass then @pullUp() else @pullDown()
      @$body.toggleClass @options.openClass

    pullUp: ->
      @$wrap.transition {y:"-#{@contentHeight}px", opacity:0}, 500, 'ease'

    pullDown: ->
      @$wrap.transition {y:"0px", opacity:1}, 500, 'ease'
          
  $.fn.extend ContentMenu: (option, args...) ->
    @each ->
      $this = $(this)
      data = $this.data('ContentMenu')

      if !data
        $this.data 'ContentMenu', (data = new ContentMenu(this, option))
      if typeof option == 'string'
        data[option].apply(data, args)
  
  $(document).ready ->
    $("body > header").ContentMenu()

) window.jQuery, window