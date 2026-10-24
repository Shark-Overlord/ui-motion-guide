window.UI_MOTION_CATALOG = [
  {
    "num": "01",
    "id": "buttons",
    "inboxDir": "01_Buttons",
    "desc": "基础物理按压、异步反馈、复制、分割菜单、按钮组、浮动工具栏、展开组、图标切换、原地确认、主题切换",
    "count": 10,
    "items": [
      {
        "slug": "action-button",
        "title": "Action Button · 异步操作按钮",
        "summary": "执行异步提交操作的高反馈按钮。",
        "specPath": "skills/ui-motion/buttons/action-button.md",
        "demoPath": "inbox/01_Buttons/action-button/index.html"
      },
      {
        "slug": "button-group",
        "title": "Button Group · 按钮组",
        "summary": "将多个关联操作紧凑并置于单一胶囊表面上的高级组合控件。",
        "specPath": "skills/ui-motion/buttons/button-group.md",
        "demoPath": "inbox/01_Buttons/button-group/index.html"
      },
      {
        "slug": "button",
        "title": "Button · 基础按钮",
        "summary": "基础按钮集合。",
        "specPath": "skills/ui-motion/buttons/button.md",
        "demoPath": "inbox/01_Buttons/button/index.html"
      },
      {
        "slug": "confirm-morph",
        "title": "Confirm Morph · 原位确认变形按钮",
        "summary": "高风险或不可逆操作的原位流转按钮。点击时不弹出打断心流的模态对话框，而是在按钮当前药丸容器内原地平滑伸展变形，承载二次确认、倒计时撤销、异步处理以及可撤回反馈。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/buttons/confirm-morph.md",
        "demoPath": "inbox/01_Buttons/confirm-morph/index.html"
      },
      {
        "slug": "copy-button",
        "title": "Copy Button · 复制按钮",
        "summary": "点击后把文本真实写入剪贴板，按写入结果切换成功或失败反馈。",
        "specPath": "skills/ui-motion/buttons/copy-button.md",
        "demoPath": "inbox/01_Buttons/copy-button/index.html"
      },
      {
        "slug": "expanding-button-group",
        "title": "Expanding Button Group · 展开按钮组",
        "summary": "空间紧凑的手风琴式横向伸展按钮组。默认仅激活项（或首项）完整展开显示“图标 + 文本”，其余各项收缩为纯图标；当光标指向或键盘聚焦于其他项时，目标项横向伸展显露文本，邻近按钮顺畅推移让位。",
        "specPath": "skills/ui-motion/buttons/expanding-button-group.md",
        "demoPath": "inbox/01_Buttons/expanding-button-group/index.html"
      },
      {
        "slug": "floating-button-group",
        "title": "Floating Button Group · 浮动工具栏组",
        "summary": "适用于画布控制、文档工具栏、消息浮动操作的高质感多按钮悬浮工具组。",
        "specPath": "skills/ui-motion/buttons/floating-button-group.md",
        "demoPath": "inbox/01_Buttons/floating-button-group/index.html"
      },
      {
        "slug": "icon-morph",
        "title": "Icon Morph · 图标形变按钮",
        "summary": "通过 SVG 矢量几何形变实现状态流转的图标交互集合。避免了传统直接替换图标的生硬视觉跳跃，通过平滑的矢量形态过渡、遮罩移位与笔触擦除传达前后状态的连续性。涵盖 8 类微动效机制：",
        "specPath": "skills/ui-motion/buttons/icon-morph.md",
        "demoPath": "inbox/01_Buttons/icon-morph/index.html"
      },
      {
        "slug": "split-button",
        "title": "Split Button · 分割按钮",
        "summary": "将主操作按钮与下拉次要动作菜单紧密组合的分割按钮。",
        "specPath": "skills/ui-motion/buttons/split-button.md",
        "demoPath": "inbox/01_Buttons/split-button/index.html"
      },
      {
        "slug": "theme-switch",
        "title": "Theme Switch · 主题切换按钮",
        "summary": "用于深色/浅色模式切换的交互控件与全屏视图过渡机制。按钮内部通过太阳与月亮双图层的旋转与微模糊顺滑互换；全局借助原生 View Transition API 与 Web Animations API (WAAPI)，提供四种不同几何维度的全屏遮罩展开效果。涵盖三大核心机制：",
        "specPath": "skills/ui-motion/buttons/theme-switch.md",
        "demoPath": "inbox/01_Buttons/theme-switch/index.html"
      }
    ]
  },
  {
    "num": "02",
    "id": "gestures",
    "inboxDir": "02_Gestures",
    "desc": "长按蓄力确认、双轴滑动操作与手势锁",
    "count": 2,
    "items": [
      {
        "slug": "hold-to-confirm",
        "title": "Hold to Confirm · 长按手势确认",
        "summary": "基于指针捕获与物理弹簧的长按蓄力确认交互。用于防止灾难性或不可逆操作的意外误触。通过双面同构层（Surface Face 与 Fill Face）的 `clip-path` 推进，呈现文字与图标随进度被新颜色精准“浸润”的效果；中途松开指针或移出按钮安全区时，进度以弹簧物理曲线平滑倒带归零。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/gestures/hold-to-confirm.md",
        "demoPath": "inbox/02_Gestures/hold-to-confirm/index.html"
      },
      {
        "slug": "swipe-actions",
        "title": "Swipe Actions · 滑动手势操作行",
        "summary": "移动端与触控交互中经典的高保真列表行手势操作。支持左右双向滑动揭露操作项、深滑蓄力直达（Deep Swipe to Commit）、投掷惯性判断（Flick Projection）以及橡皮筋越界阻尼。为无法使用滑动手势的用户和辅助技术提供无缝降级的辅助下拉菜单。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/gestures/swipe-actions.md",
        "demoPath": "inbox/02_Gestures/swipe-actions/index.html"
      }
    ]
  },
  {
    "num": "03",
    "id": "menus",
    "inboxDir": "03_Menus",
    "desc": "右键上下文菜单、自适应下拉动作菜单、用户账户卡片面板",
    "count": 3,
    "items": [
      {
        "slug": "context-menu",
        "title": "Context Menu · 上下文菜单",
        "summary": "光标精准定位的浮动右键/长按菜单。菜单从光标指针或键盘触发坐标作为动态原点（`transform-origin`）向外弹性展开；内置视口四向防溢出边界裁剪算法，条目间搭载平滑滑动的背景高光胶囊（Gliding Highlight）。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/menus/context-menu.md",
        "demoPath": "inbox/03_Menus/context-menu/index.html"
      },
      {
        "slug": "dropdown-menu",
        "title": "Dropdown Menu · 下拉菜单",
        "summary": "用于操作栏与列表头的高保真下拉动作菜单。包含触发器文字自适应测量、智能视口防遮挡翻转（Collision Flip）、背景模态锁（Modal Lock）以及键入首字母快速检索（Typeahead）。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/menus/dropdown-menu.md",
        "demoPath": "inbox/03_Menus/dropdown-menu/index.html"
      },
      {
        "slug": "user-menu",
        "title": "User Menu · 用户账户菜单",
        "summary": "综合型用户个人中心与设置下拉面板。包含触发器头像/名称联动、面板自顶部中心向外展开的弹簧物理补间、条目间单例滑动高光底板、内嵌三段式昼夜主题滑块控制器，以及退出登录时的异步等待态（Sign out 转换为 Signing out... 配合 Spinner 旋转）和登出后回退为 Sign in 的闭环逻辑。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/menus/user-menu.md",
        "demoPath": "inbox/03_Menus/user-menu/index.html"
      }
    ]
  },
  {
    "num": "04",
    "id": "text-fields",
    "inboxDir": "04_Text_fields",
    "desc": "单行/多行输入框、密码明暗切换、密码强度检验、带清除搜索框、可伸展搜索条、原地行内编辑",
    "count": 7,
    "items": [
      {
        "slug": "expanding-search",
        "title": "Expanding Search · 展开式搜索字段",
        "summary": "从 44px 紧凑圆形图标按钮平滑横向伸展至 360px 完整搜索栏的形变组件。解决导航栏/紧凑空间中的搜索视觉侵占问题。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/text-fields/expanding-search.md",
        "demoPath": "inbox/04_Text_fields/expanding-search/index.html"
      },
      {
        "slug": "inline-edit",
        "title": "Inline Edit · 行内就地编辑",
        "summary": "排版文本与表单输入控件之间的原地平滑切换组件。解决传统模态弹窗或整表单刷新带来的流程中断与视觉跳动。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/text-fields/inline-edit.md",
        "demoPath": "inbox/04_Text_fields/inline-edit/index.html"
      },
      {
        "slug": "input",
        "title": "Input · 基础输入框",
        "summary": "单行表单输入控件。在保留浏览器原生输入合成、选择、撤销与辅助技术的基础上，提供零尺寸抖动的边框平滑过渡，以及下方自适应高度与逐字微模糊进退场的消息插槽。涵盖三大核心机制：",
        "specPath": "skills/ui-motion/text-fields/input.md",
        "demoPath": "inbox/04_Text_fields/input/index.html"
      },
      {
        "slug": "password-field",
        "title": "Password Field · 密码输入框",
        "summary": "专用于敏感凭据与密码输入的单行字段控件。解决明暗文切换时的生硬突变与图标割裂问题。涵盖三大核心机制：",
        "specPath": "skills/ui-motion/text-fields/password-field.md",
        "demoPath": "inbox/04_Text_fields/password-field/index.html"
      },
      {
        "slug": "password-strength",
        "title": "Password Strength · 密码强度计量字段",
        "summary": "结合实时强度计算、分段波浪计量条与条件核验反馈的高阶密码输入控件。在用户键入密码时提供毫秒级、零卡顿的多维度视觉指引。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/text-fields/password-strength.md",
        "demoPath": "inbox/04_Text_fields/password-strength/index.html"
      },
      {
        "slug": "search-field",
        "title": "Search Field · 搜索输入框",
        "summary": "带有固定尾部清除槽位与高响应度交互状态的搜索控件。杜绝按钮出现时的内容抖动与焦点丢失。涵盖三大核心机制：",
        "specPath": "skills/ui-motion/text-fields/search-field.md",
        "demoPath": "inbox/04_Text_fields/search-field/index.html"
      },
      {
        "slug": "textarea",
        "title": "Textarea · 多行文本域",
        "summary": "多行长文本输入控件。在完整保留多行排版、行高、原生软换行与输入法合成的基础上，提供与单行输入框一致的零尺寸抖动边框过渡，以及下方自适应高度消息提示槽。涵盖三大核心机制：",
        "specPath": "skills/ui-motion/text-fields/textarea.md",
        "demoPath": "inbox/04_Text_fields/textarea/index.html"
      }
    ]
  },
  {
    "num": "05",
    "id": "special-inputs",
    "inboxDir": "05_Special_inputs",
    "desc": "数字步进滚轮、货币金额、国际区号号码、多标签胶囊、@提及浮层、快捷键录制",
    "count": 6,
    "items": [
      {
        "slug": "mention-input",
        "title": "Mention Input · 富交互提及输入框",
        "summary": "基于真实原生 `<textarea>` 与 1:1 同步背景镜像层（Backdrop Mirror）构建的 `@人物` 与 `#频道` 提及输入组件。在完全保留浏览器原生输入法合成、选区与撤销栈（Undo）的前提下，实现正文中提及胶囊高亮与跟随光标坐标的建议浮层。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/special-inputs/mention-input.md",
        "demoPath": "inbox/05_Special_inputs/mention-input/index.html"
      },
      {
        "slug": "money-input",
        "title": "Money Input · 货币金额输入框",
        "summary": "支持最小货币单位（Minor Units）精确换算、千分位与小数幽灵占位镜像、币种动态切换与自适应缩放的金融级金额输入组件。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/special-inputs/money-input.md",
        "demoPath": "inbox/05_Special_inputs/money-input/index.html"
      },
      {
        "slug": "number-field",
        "title": "Number Field · 数字步进输入框",
        "summary": "集成分位数字滚轮（Odometer）、长按指数加速步进、标签横向拖拽微调（Scrubbing）与越界物理反冲的数值输入控件。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/special-inputs/number-field.md",
        "demoPath": "inbox/05_Special_inputs/number-field/index.html"
      },
      {
        "slug": "phone-input",
        "title": "Phone Input · 国际电话号码输入框",
        "summary": "集成单表面几何形变（Single-Surface Morphing）国家区号选择器、实时号段格式化与未填位掩码引导的电话号码输入组件。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/special-inputs/phone-input.md",
        "demoPath": "inbox/05_Special_inputs/phone-input/index.html"
      },
      {
        "slug": "shortcut-recorder",
        "title": "Shortcut Recorder · 键盘快捷键录制器",
        "summary": "结合物理键帽按压动效、实时修饰键预览、同键位复用 FLIP 位移与冲突拦截决策的快捷键绑定组件。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/special-inputs/shortcut-recorder.md",
        "demoPath": "inbox/05_Special_inputs/shortcut-recorder/index.html"
      },
      {
        "slug": "tag-input",
        "title": "Tag Input · 多标签胶囊输入框",
        "summary": "将已添加标签保持为真实 DOM 胶囊元素，结合共享选中高亮环、两步式安全退格删除与 FLIP 换行重排的复合输入组件。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/special-inputs/tag-input.md",
        "demoPath": "inbox/05_Special_inputs/tag-input/index.html"
      }
    ]
  },
  {
    "num": "06",
    "id": "selects",
    "inboxDir": "06_Selects",
    "desc": "紧凑单选下拉、可搜索组合框、容器形变选择器、多选标签收集器、流式过滤标签组",
    "count": 5,
    "items": [
      {
        "slug": "chip-group",
        "title": "Chip Group · 过滤标签胶囊组",
        "summary": "用于多维标签筛选、状态标记与分类选择的高性能交互组件。",
        "specPath": "skills/ui-motion/selects/chip-group.md",
        "demoPath": "inbox/06_Selects/chip-group/index.html"
      },
      {
        "slug": "combobox",
        "title": "Combobox · 组合搜索选择框",
        "summary": "结合单行文本搜索与浮动候选项列表的自适应选择器。",
        "specPath": "skills/ui-motion/selects/combobox.md",
        "demoPath": "inbox/06_Selects/combobox/index.html"
      },
      {
        "slug": "morph-select",
        "title": "Morph Select · 形变卡片选择器",
        "summary": "将触发器按钮与展开列表整合为单一连续形变容器的高阶选择器。",
        "specPath": "skills/ui-motion/selects/morph-select.md",
        "demoPath": "inbox/06_Selects/morph-select/index.html"
      },
      {
        "slug": "multi-select",
        "title": "Multi-select · 多选标签收集器",
        "summary": "支持在紧凑输入框内收纳多项已选项的高品质选择器。",
        "specPath": "skills/ui-motion/selects/multi-select.md",
        "demoPath": "inbox/06_Selects/multi-select/index.html"
      },
      {
        "slug": "select",
        "title": "Select · 原生感单选下拉菜单",
        "summary": "经典紧凑型单选下拉组件。",
        "specPath": "skills/ui-motion/selects/select.md",
        "demoPath": "inbox/06_Selects/select/index.html"
      }
    ]
  },
  {
    "num": "07",
    "id": "toggles",
    "inboxDir": "07_Toggles",
    "desc": "二值机械拉伸开关、真实笔触复选框、分段控制胶囊、单选列表、对比单选卡片、计费周期切换",
    "count": 6,
    "items": [
      {
        "slug": "billing-toggle",
        "title": "Billing Toggle · 计费周期切换胶囊",
        "summary": "专为 SaaS 定价方案设计的月付/年付联动切换胶囊。",
        "specPath": "skills/ui-motion/toggles/billing-toggle.md",
        "demoPath": "inbox/07_Toggles/billing-toggle/index.html"
      },
      {
        "slug": "checkbox",
        "title": "Checkbox · 弹性笔触复选框",
        "summary": "具备极具触感的按压反馈与 SVG 真实笔触书写动画的原生复选框。",
        "specPath": "skills/ui-motion/toggles/checkbox.md",
        "demoPath": "inbox/07_Toggles/checkbox/index.html"
      },
      {
        "slug": "radio-cards",
        "title": "Radio Cards · 共享高光单选卡片组",
        "summary": "用于订阅计划选择、支付方式选取及多维方案决策的卡片式单选组。",
        "specPath": "skills/ui-motion/toggles/radio-cards.md",
        "demoPath": "inbox/07_Toggles/radio-cards/index.html"
      },
      {
        "slug": "radio-group",
        "title": "Radio Group · 滑动高光单选组",
        "summary": "垂直选项列表的机械感单选组件。",
        "specPath": "skills/ui-motion/toggles/radio-group.md",
        "demoPath": "inbox/07_Toggles/radio-group/index.html"
      },
      {
        "slug": "segmented-control",
        "title": "Segmented Control · 分段控制切换胶囊",
        "summary": "用于视图模式切换、页面分栏及紧凑选项互斥的高质感分段胶囊。",
        "specPath": "skills/ui-motion/toggles/segmented-control.md",
        "demoPath": "inbox/07_Toggles/segmented-control/index.html"
      },
      {
        "slug": "switch",
        "title": "Switch · 机械拉伸滑动开关",
        "summary": "模拟物理受压与横向弹射滑翔的二值开关。",
        "specPath": "skills/ui-motion/toggles/switch.md",
        "demoPath": "inbox/07_Toggles/switch/index.html"
      }
    ]
  },
  {
    "num": "08",
    "id": "sliders",
    "inboxDir": "08_Sliders",
    "desc": "连续数值平滑调节滑块、触觉橡皮筋弹性拉伸滑块",
    "count": 2,
    "items": [
      {
        "slug": "elastic-slider",
        "title": "Elastic Slider · 橡皮筋弹性滑块",
        "summary": "具备触觉阻尼、刻度磁吸与速度倾斜动态气泡的高级弹性滑块。",
        "specPath": "skills/ui-motion/sliders/elastic-slider.md",
        "demoPath": "inbox/08_Sliders/elastic-slider/index.html"
      },
      {
        "slug": "slider",
        "title": "Slider · 连续区间与双滑块滑动调节器",
        "summary": "支持单滑块数值调节与双滑块区间选定的精准控制条。",
        "specPath": "skills/ui-motion/sliders/slider.md",
        "demoPath": "inbox/08_Sliders/slider/index.html"
      }
    ]
  },
  {
    "num": "09",
    "id": "pickers",
    "inboxDir": "09_Pickers",
    "desc": "拾色器、日历面板、日期选择器、日期范围选择器、时间选择器",
    "count": 5,
    "items": [
      {
        "slug": "calendar",
        "title": "Calendar · 日历",
        "summary": "用于独立视图或嵌入卡片中的月度日期选择与浏览面板。包含恒定 6 周 42 天零抖动网格、月份标题错峰滑移、整网格方向性平滑切页以及今天指示圆点。涵盖三大核心机制：",
        "specPath": "skills/ui-motion/pickers/calendar.md",
        "demoPath": "inbox/09_Pickers/calendar/index.html"
      },
      {
        "slug": "color-picker",
        "title": "Color Picker · 颜色选择器",
        "summary": "用于精细调节界面色彩的高保真拾色器。集成 2D 饱和度与明度调色盘、色相与不透明度滑动条、多格式（Hex/RGB/HSL）平滑切换、屏幕吸色（EyeDropper）以及实时对比度可访问性评级。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/pickers/color-picker.md",
        "demoPath": "inbox/09_Pickers/color-picker/index.html"
      },
      {
        "slug": "date-picker",
        "title": "Date Picker · 日期选择器",
        "summary": "用于表单输入流的高保真单日期选择组件。由触发器输入框与浮动弹层日历组成，包含逐段数字滚轮置换、弹层 Presence 浮动展开、月度网格滑动高光胶囊以及全键盘无障碍巡回。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/pickers/date-picker.md",
        "demoPath": "inbox/09_Pickers/date-picker/index.html"
      },
      {
        "slug": "date-range-picker",
        "title": "Date Range Picker · 日期区间选择器",
        "summary": "用于选取大跨度时间跨度的高保真双月联动日期区间选择面板。集成左侧预设快捷导轨（Rail Presets）、双月并排连续日期网格、分段胶囊选区绘制（Range Bars Layer）、悬停区间流体预览以及底部确认动作条。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/pickers/date-range-picker.md",
        "demoPath": "inbox/09_Pickers/date-range-picker/index.html"
      },
      {
        "slug": "time-picker",
        "title": "Time Picker · 时间选择器",
        "summary": "用于精确选取时刻（小时与分钟）的轻量级下拉列表选择组件。包含时间数值微模糊上下置换、弹层 Presence 浮动展开、选项纵向自动滚轮居中（Auto Center Scroll）以及键盘方向键快捷步进巡回。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/pickers/time-picker.md",
        "demoPath": "inbox/09_Pickers/time-picker/index.html"
      }
    ]
  },
  {
    "num": "10",
    "id": "editors",
    "inboxDir": "10_Editors",
    "desc": "语法高亮代码块、文件拖拽投递区、富文本格式化编辑器、矢量签名手写板",
    "count": 4,
    "items": [
      {
        "slug": "code-block",
        "title": "Code Block · 代码块",
        "summary": "用于代码展示与文档集成的高保真代码块组件。集成动态视口高度测量伸缩（Measured Viewport Height）、文件名幽灵标尺防抖置换（Ghost Sizer Swap）、行数折叠展开以及微动画反馈复制按钮。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/editors/code-block.md",
        "demoPath": "inbox/10_Editors/code-block/index.html"
      },
      {
        "slug": "file-dropzone",
        "title": "File Dropzone · 文件投递区",
        "summary": "用于文档附件、编辑器素材与多媒体资源拖拽上传的高保真文件投递区组件。集成三层纸张 3D 浮动张力展开（Three Sheets 3D Hover Spread）、SVG 周长边缘发光流动（SVG Edge Perimeter Glow）、拖放文件抓取反馈以及条目进度卡片平滑淡入。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/editors/file-dropzone.md",
        "demoPath": "inbox/10_Editors/file-dropzone/index.html"
      },
      {
        "slug": "rich-text-editor",
        "title": "Rich Text Editor · 富文本编辑器",
        "summary": "用于文档撰写、发布排版与笔记编辑的高保真富文本编辑器组件。集成选区吸附浮动工具栏（Floating Selection Toolbar）、工具栏双面形变切换（Toolbar Face Morphing）、斜杠快捷指令菜单（Slash Command Menu）以及实时字数微模糊统计。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/editors/rich-text-editor.md",
        "demoPath": "inbox/10_Editors/rich-text-editor/index.html"
      },
      {
        "slug": "signature-pad",
        "title": "Signature Pad · 电子签名板",
        "summary": "用于合同签署、授权确认与身份认证的高保真压感墨水手写签名板。集成平滑贝塞尔曲线笔触插值（Smooth Ink Spline Interpolation）、签名指引线与提示微模糊隐退（Sign Here Micro-Blur Fade）、墨水颜色与笔宽即时置换、签名回放（Replay Signature）以及主动作异步签署形态流转。涵盖四大核心机制：",
        "specPath": "skills/ui-motion/editors/signature-pad.md",
        "demoPath": "inbox/10_Editors/signature-pad/index.html"
      }
    ]
  },
  {
    "num": "11",
    "id": "navigation",
    "inboxDir": "11_Navigation",
    "desc": "面包屑折叠路径、弹性分页控制器、滑动高光标签页",
    "count": 3,
    "items": [
      {
        "slug": "breadcrumb",
        "title": "Breadcrumb · 面包屑导航",
        "summary": "用于层级化页面路径导航与上下文层级回溯。",
        "specPath": "skills/ui-motion/navigation/breadcrumb.md",
        "demoPath": "inbox/11_Navigation/breadcrumb/index.html"
      },
      {
        "slug": "pagination",
        "title": "Pagination · 分页导航",
        "summary": "用于长列表数据分批浏览的分页控制器。",
        "specPath": "skills/ui-motion/navigation/pagination.md",
        "demoPath": "inbox/11_Navigation/pagination/index.html"
      },
      {
        "slug": "tabs",
        "title": "Tabs · 选项卡导航",
        "summary": "用于同级视图维度与上下文模块切换的分段选项卡。",
        "specPath": "skills/ui-motion/navigation/tabs.md",
        "demoPath": "inbox/11_Navigation/tabs/index.html"
      }
    ]
  },
  {
    "num": "12",
    "id": "expand",
    "inboxDir": "12_Expand",
    "desc": "手风琴风琴折、卡片原位展开、可拖拽分割面板、自适应滚动容器",
    "count": 4,
    "items": [
      {
        "slug": "accordion",
        "title": "Accordion · 手风琴折叠面板",
        "summary": "用于垂直区域内容按需展开与折叠的信息架构组件。",
        "specPath": "skills/ui-motion/expand/accordion.md",
        "demoPath": "inbox/12_Expand/accordion/index.html"
      },
      {
        "slug": "expandable-card",
        "title": "Expandable Card · 可展开卡片",
        "summary": "用于承载多阶段复杂摘要并在原地平滑拉伸展开详情的双维形变卡片。",
        "specPath": "skills/ui-motion/expand/expandable-card.md",
        "demoPath": "inbox/12_Expand/expandable-card/index.html"
      },
      {
        "slug": "resizable-panels",
        "title": "Resizable Panels · 可调面板组",
        "summary": "用于多栏工作区布局与自由横向拖拽调节比例的分栏容器。",
        "specPath": "skills/ui-motion/expand/resizable-panels.md",
        "demoPath": "inbox/12_Expand/resizable-panels/index.html"
      },
      {
        "slug": "scroll-area",
        "title": "Scroll Area · 滚动区域",
        "summary": "用于限制内容视口并提供动态边缘渐隐遮罩与平滑悬浮滚动条的滚动容器。",
        "specPath": "skills/ui-motion/expand/scroll-area.md",
        "demoPath": "inbox/12_Expand/scroll-area/index.html"
      }
    ]
  },
  {
    "num": "13",
    "id": "overlays",
    "inboxDir": "13_Overlays",
    "desc": "底部抽屉、对话弹窗、侧边抽屉、悬浮预览卡片、气泡弹层、分享权限卡片、智能提示",
    "count": 7,
    "items": [
      {
        "slug": "bottom-sheet",
        "title": "Bottom Sheet · 底部抽屉",
        "summary": "用于移动端或紧凑视口下自底部滑出的多档停靠交互面板。",
        "specPath": "skills/ui-motion/overlays/bottom-sheet.md",
        "demoPath": "inbox/13_Overlays/bottom-sheet/index.html"
      },
      {
        "slug": "dialog",
        "title": "Dialog · 对话框",
        "summary": "用于承载关键业务决策、不可逆操作二次确认与聚焦任务流的居中模态对话框。",
        "specPath": "skills/ui-motion/overlays/dialog.md",
        "demoPath": "inbox/13_Overlays/dialog/index.html"
      },
      {
        "slug": "drawer",
        "title": "Drawer · 侧边抽屉",
        "summary": "用于从屏幕边缘或容器侧方平滑滑出的侧边交互面板。",
        "specPath": "skills/ui-motion/overlays/drawer.md",
        "demoPath": "inbox/13_Overlays/drawer/index.html"
      },
      {
        "slug": "hover-card",
        "title": "Hover Card · 悬停卡片",
        "summary": "用于在链接或提及元素上方通过光标悬停快速预览用户画像或富文本信息的浮动卡片。",
        "specPath": "skills/ui-motion/overlays/hover-card.md",
        "demoPath": "inbox/13_Overlays/hover-card/index.html"
      },
      {
        "slug": "popover",
        "title": "Popover · 弹出框",
        "summary": "用于在锚点按钮邻近区域展开上下文交互、微型表单或辅助说明的浮动浮层。",
        "specPath": "skills/ui-motion/overlays/popover.md",
        "demoPath": "inbox/13_Overlays/popover/index.html"
      },
      {
        "slug": "share-access",
        "title": "Share Access · 共享访问管理",
        "summary": "用于文档与工作区协作者邀请、权限分配与链接分享的复合型权限弹窗。",
        "specPath": "skills/ui-motion/overlays/share-access.md",
        "demoPath": "inbox/13_Overlays/share-access/index.html"
      },
      {
        "slug": "tooltip",
        "title": "Tooltip · 文字提示",
        "summary": "用于在悬停或聚焦纯图标与紧凑控件时提供简明辅助说明的轻量浮层。",
        "specPath": "skills/ui-motion/overlays/tooltip.md",
        "demoPath": "inbox/13_Overlays/tooltip/index.html"
      }
    ]
  },
  {
    "num": "14",
    "id": "messages",
    "inboxDir": "14_Messages",
    "desc": "状态警示条、公告栏滚动、轻量 Toast 提示、多通知堆叠管理",
    "count": 4,
    "items": [
      {
        "slug": "alert",
        "title": "Alert · 警示通知栏",
        "summary": "用于展示页面局部或全局任务状态、警告与系统反馈的常驻/可收起通知横幅。",
        "specPath": "skills/ui-motion/messages/alert.md",
        "demoPath": "inbox/14_Messages/alert/index.html"
      },
      {
        "slug": "announcement-bar",
        "title": "Announcement Bar · 公告栏",
        "summary": "用于全站或页面顶端传达重要产品更新、运营公告或活动倒计时的通栏公告横幅。",
        "specPath": "skills/ui-motion/messages/announcement-bar.md",
        "demoPath": "inbox/14_Messages/announcement-bar/index.html"
      },
      {
        "slug": "toast-stack",
        "title": "Toast Stack · 吐司通知栈",
        "summary": "用于在视口右下角管理多条并发通知的层叠堆叠（Card Stacking）与弹性展开组件。",
        "specPath": "skills/ui-motion/messages/toast-stack.md",
        "demoPath": "inbox/14_Messages/toast-stack/index.html"
      },
      {
        "slug": "toast",
        "title": "Toast · 吐司提示",
        "summary": "用于在页面边缘悬浮呈现轻量级、非阻塞型操作反馈（如“草稿已保存”、“链接已复制”）的瞬态通知组件。",
        "specPath": "skills/ui-motion/messages/toast.md",
        "demoPath": "inbox/14_Messages/toast/index.html"
      }
    ]
  },
  {
    "num": "15",
    "id": "progress",
    "inboxDir": "15_Progress",
    "desc": "环形倒计时、线性/环形进度条、骨架屏微光、分步步骤条、用量仪表盘",
    "count": 5,
    "items": [
      {
        "slug": "countdown",
        "title": "Countdown · 倒计时",
        "summary": "用于在活动大促、版本发布或重要日程节点呈现紧迫感的高品质时间倒计时组件。",
        "specPath": "skills/ui-motion/progress/countdown.md",
        "demoPath": "inbox/15_Progress/countdown/index.html"
      },
      {
        "slug": "progress",
        "title": "Progress · 进度条",
        "summary": "用于反馈文件上传、批量下载、数据同步或步骤完成度的线性进度条组件。",
        "specPath": "skills/ui-motion/progress/progress.md",
        "demoPath": "inbox/15_Progress/progress/index.html"
      },
      {
        "slug": "skeleton",
        "title": "Skeleton · 骨架屏",
        "summary": "用于在网络异步请求或数据加载期间提供排版占位预期的骨架屏组件。",
        "specPath": "skills/ui-motion/progress/skeleton.md",
        "demoPath": "inbox/15_Progress/skeleton/index.html"
      },
      {
        "slug": "stepper",
        "title": "Stepper · 步骤向导",
        "summary": "用于引导用户完成多阶段复杂表单、安装向导或订单推进的步骤条组件。",
        "specPath": "skills/ui-motion/progress/stepper.md",
        "demoPath": "inbox/15_Progress/stepper/index.html"
      },
      {
        "slug": "usage-meter",
        "title": "Usage Meter · 用量计量表",
        "summary": "用于多维度资源配额、云存储用量与计费限额监控的复合计量仪表盘组件。",
        "specPath": "skills/ui-motion/progress/usage-meter.md",
        "demoPath": "inbox/15_Progress/usage-meter/index.html"
      }
    ]
  },
  {
    "num": "16",
    "id": "avatars",
    "inboxDir": "16_Avatars",
    "desc": "交互头像、层叠头像组、状态指示徽标",
    "count": 3,
    "items": [
      {
        "slug": "avatar-group",
        "title": "Avatar Group · 头像组",
        "summary": "用于团队协同、协作者列表以及多用户头像重叠排布场景。",
        "specPath": "skills/ui-motion/avatars/avatar-group.md",
        "demoPath": "inbox/16_Avatars/avatar-group/index.html"
      },
      {
        "slug": "avatar",
        "title": "Avatar · 头像",
        "summary": "用于展示用户与实体形象、在线/离线实时状态指示以及图片失效时的首字母缩写兜底。",
        "specPath": "skills/ui-motion/avatars/avatar.md",
        "demoPath": "inbox/16_Avatars/avatar/index.html"
      },
      {
        "slug": "badge",
        "title": "Badge · 徽标",
        "summary": "用于展示对象状态、分类标签、审阅阶段或数值指示的紧凑型徽标组件。",
        "specPath": "skills/ui-motion/avatars/badge.md",
        "demoPath": "inbox/16_Avatars/badge/index.html"
      }
    ]
  },
  {
    "num": "17",
    "id": "cards",
    "inboxDir": "17_Cards",
    "desc": "多层卡片堆叠、多态信息卡片、动态指标度量卡片",
    "count": 3,
    "items": [
      {
        "slug": "card-stack",
        "title": "Card Stack · 堆叠卡片",
        "summary": "用于轻量滑动决策、筛选卡片流（如通过/忽略、保留/跳过）的高流畅度物理手势堆叠卡片组件。",
        "specPath": "skills/ui-motion/cards/card-stack.md",
        "demoPath": "inbox/17_Cards/card-stack/index.html"
      },
      {
        "slug": "card",
        "title": "Card · 交互式卡片",
        "summary": "集合封面图片、元数据排版、状态操作与沉浸式全屏快速预览（Quick Look）的高品质内容卡片。",
        "specPath": "skills/ui-motion/cards/card.md",
        "demoPath": "inbox/17_Cards/card/index.html"
      },
      {
        "slug": "metric-card",
        "title": "Metric Card · 指标统计卡片",
        "summary": "集成机械垂直数字滚轮计数器、平滑自适应涨跌幅胶囊与分段周期切换的高性能指标卡片。",
        "specPath": "skills/ui-motion/cards/metric-card.md",
        "demoPath": "inbox/17_Cards/metric-card/index.html"
      }
    ]
  },
  {
    "num": "18",
    "id": "charts",
    "inboxDir": "18_Charts",
    "desc": "滚动计数器、柱状图、环形图、漏斗图、仪表盘、折线图、雷达图、实时数据流、脊线图、斜率图、迷你走势图、分割柱图、时间轴、华夫饼图",
    "count": 14,
    "items": [
      {
        "slug": "animated-counter",
        "title": "Animated Counter · 数字翻滚计数器",
        "summary": "用于统计指标、财务数据、计数器及实时响应量动态递增/递减时的机械数字轮盘翻滚动效。通过 Ghost Sizer（隐形占位符）锁死字符列物理几何尺寸，杜绝数字跳变引发的外框横向抖动与重排抖动；配合垂直滚轮与运动模糊模拟真实机械翻牌器质感。",
        "specPath": "skills/ui-motion/charts/animated-counter.md",
        "demoPath": "inbox/18_Charts/animated-counter/index.html"
      },
      {
        "slug": "bar-chart",
        "title": "Bar Chart · 柱状图",
        "summary": "用于离散分类或连续时间序列对比的高性能 SVG 柱状图。包含入场高度错峰生长、均值辅助线平滑升降、光标/指针跟手 Scrubbing 实时探查与数值切换、零抖动 Ghost Sizer 标题指标数值联动，以及键盘全无障碍滑块映射。",
        "specPath": "skills/ui-motion/charts/bar-chart.md",
        "demoPath": "inbox/18_Charts/bar-chart/index.html"
      },
      {
        "slug": "donut-chart",
        "title": "Donut Chart · 环形图",
        "summary": "用于分类份额、渠道占比和资源分配对比的高质感 SVG 环形图。包含入场弧形扫掠（Sweep）、动态角度重分布弹簧动画（Angle Redistribution）、悬停时扇区径向外凸微放大（Lift & Grow）、中心鼓（Center Drum）统计数值与占比平滑切换，以及图例联动过滤。",
        "specPath": "skills/ui-motion/charts/donut-chart.md",
        "demoPath": "inbox/18_Charts/donut-chart/index.html"
      },
      {
        "slug": "funnel-chart",
        "title": "Funnel Chart · 漏斗图",
        "summary": "用于转化漏斗、多阶段流失分析（如电商结账漏斗、注册转化流）的连续曲面 SVG + 粒子流动漏斗图。采用五次光滑过渡曲线（Quintic Smoothstep）插值各阶段宽度，支持步骤间流失率指示、聚焦高亮光晕、跟手探查提示框，以及可选的 Canvas 流体粒子动效。",
        "specPath": "skills/ui-motion/charts/funnel-chart.md",
        "demoPath": "inbox/18_Charts/funnel-chart/index.html"
      },
      {
        "slug": "gauge",
        "title": "Gauge · 仪表盘",
        "summary": "用于系统负载、健康评分、存储用量和目标达成率的 270 度圆弧仪表盘。包含由零起步的物理阻尼圆弧弹簧生长（First Fill Spring）、跨阈值（Success/Warning/Danger）颜色与状态标签微模糊置换、数字轮盘 Ghost Sizer 防抖，以及原生 `role=\"meter\"` 无障碍语义绑定。",
        "specPath": "skills/ui-motion/charts/gauge.md",
        "demoPath": "inbox/18_Charts/gauge/index.html"
      },
      {
        "slug": "line-chart",
        "title": "Line Chart · 折线图",
        "summary": "用于连续时间序列、多周期对比（本期 vs 上期）以及多指标趋势分析的高性能平滑折线与面积图。包含样条平滑曲线渲染（Catmull-Rom / Monotone）、重采样路径形变（Shared Morph Grid Points）、跟手十字准星（Crosshair Scrubbing）、边界自适应翻转提示框（Flipped Tooltip），以及图例系列显隐切换。",
        "specPath": "skills/ui-motion/charts/line-chart.md",
        "demoPath": "inbox/18_Charts/line-chart/index.html"
      },
      {
        "slug": "radar-chart",
        "title": "Radar Chart · 雷达图",
        "summary": "用于多维属性评估（如城市对比、候选人技能、产品特性分析）的蜘蛛网多边形雷达图。包含多同心多边形环与径向辐条（Spoke）、多系列多边形归一化平滑形变（Morphing）、辐条焦点悬停吸附（Active Spoke）、系列交点圆环与排序对比提示框，以及全键盘轴点轮转。",
        "specPath": "skills/ui-motion/charts/radar-chart.md",
        "demoPath": "inbox/18_Charts/radar-chart/index.html"
      },
      {
        "slug": "realtime-stream",
        "title": "Realtime Stream · 实时流图",
        "summary": "用于高频时间序列实时监控（如 API p95 响应延迟、QPS、网络吞吐量、传感器遥测数据）的 Canvas 连续动态流图。支持固定时间滑动窗口（Rolling Window）、无抖动平滑时间插值、最新数值呼吸脉冲、指针或焦点移入时自动锁定画面（Hold View）供历史探查，以及空格键暂停/恢复。",
        "specPath": "skills/ui-motion/charts/realtime-stream.md",
        "demoPath": "inbox/18_Charts/realtime-stream/index.html"
      },
      {
        "slug": "ridgeline",
        "title": "Ridgeline · 山脊图",
        "summary": "用于多分组连续数值分布演变（如 12 个月份气温分布、多部门薪资带、多版本响应时间分布）的垂直重叠密度山脊图（Joyplot）。包含高斯核密度估计（KDE）重绘、上下层垂直交错遮挡渲染、悬停单层弹簧浮起透镜（Lens Lift 6px）、四分位间距带（IQR Band）高亮，以及全键盘逐行逐点探查。",
        "specPath": "skills/ui-motion/charts/ridgeline.md",
        "demoPath": "inbox/18_Charts/ridgeline/index.html"
      },
      {
        "slug": "slope-chart",
        "title": "Slope Chart · 坡度图",
        "summary": "用于两期对照（如 Q1 vs Q2、改版前 vs 改版后）指标变动与位次排位跃迁的斜率坡度图。包含从左至右错峰路径笔触展开（700ms Stroke Draw）、标签碰撞避让引线（Leader Lines）、排名升降动态角标（Rank Indicator）、悬停高亮与未聚焦项静音淡化，以及全键盘无障碍巡检。",
        "specPath": "skills/ui-motion/charts/slope-chart.md",
        "demoPath": "inbox/18_Charts/slope-chart/index.html"
      },
      {
        "slug": "sparkline",
        "title": "Sparkline · 迷你折线图",
        "summary": "用于紧凑数据看板、表格行内指标与资产卡片内的极简微型走势图。无冗余坐标网格，采用自适应样条曲线、笔触书写展开（840ms Stroke Reveal）、最新值着陆端点脉冲（Landed End Dot）、零抖动 Ghost Sizer 标题指标数值联动，以及光标掠过时的过去亮起与未来暗化探查（Scrubbing）。",
        "specPath": "skills/ui-motion/charts/sparkline.md",
        "demoPath": "inbox/18_Charts/sparkline/index.html"
      },
      {
        "slug": "split-bar",
        "title": "Split Bar · 分割条形图",
        "summary": "用于单维度多分类占比与份额重平衡（如流量渠道分布、存储配额占用、预算开销比例）的比例水平分割条形图。包含横向分段弹性重平衡（Slice Spring）、空间不足自动溢出引导折线（Leader Lines & Outside Labels）、零抖动 Ghost Sizer 标题指标数值联动，以及图例点击过滤重排。",
        "specPath": "skills/ui-motion/charts/split-bar.md",
        "demoPath": "inbox/18_Charts/split-bar/index.html"
      },
      {
        "slug": "timeline",
        "title": "Timeline · 时间线",
        "summary": "用于按日历时间分组展示离散事件活动流（如项目动态、审计日志、发布历史、工单生命周期）的分组交互时间线。包含视口交叉驱动的连线垂直生长动画（Downward Segment Scale）、小圆点弹性弹出（Marker Pop Spring）、可折叠详情手风琴（Detail Accordion）、相对时间动态计算与键盘上下箭头巡航。",
        "specPath": "skills/ui-motion/charts/timeline.md",
        "demoPath": "inbox/18_Charts/timeline/index.html"
      },
      {
        "slug": "waffle-chart",
        "title": "Waffle Chart · 华夫饼图",
        "summary": "用于展示多分类构成与绝对/相对份额占比（如国家电力能源来源结构、人群分布画像、产品开销构成）的 10×10 百分比单元格网格华夫饼图。包含最大余数法（Largest Remainder Method）全量 100 格无缝分配、最少位移重平衡迁移、插槽错峰入场缩放（Slot-staggered Reveal）、光标聚焦环与分类半透明遮罩暗化（Dim Opacity 0.26）、浮动跟随提示框及键盘箭头网格巡航。",
        "specPath": "skills/ui-motion/charts/waffle-chart.md",
        "demoPath": "inbox/18_Charts/waffle-chart/index.html"
      }
    ]
  },
  {
    "num": "19",
    "id": "advanced-charts",
    "inboxDir": "19_Advanced_charts",
    "desc": "刷选缩放图、交互数据网格、竞速条形图、桑基能量流、河流图、旭日图、矩形树图",
    "count": 7,
    "items": [
      {
        "slug": "brush-chart",
        "title": "Brush Chart · 笔刷时间范围图表",
        "summary": "包含主折线/面积绘图区与底部概览滑块条（Overview Strip）的双层联动时序图表。通过双向拖拽手柄、窗口平移、主图光标十字探查（Scrubbing）以及键盘滑块无障碍映射，在海量连续时间序列中提供毫秒级平滑视窗缩放与区间选定。",
        "specPath": "skills/ui-motion/advanced-charts/brush-chart.md",
        "demoPath": "inbox/19_Advanced_charts/brush-chart/index.html"
      },
      {
        "slug": "data-grid",
        "title": "Data Grid · 高性能数据网格",
        "summary": "支持万级数据量流畅交互的企业级原生虚拟滚动数据表格。包含基于 `transform: translateY` 的高频虚拟行布局计算、首列绝对定位固定锁定（Column Pinning）、列宽拖拽弹性调节、表头多列排序、实时模糊检索与动态行数计数器联动、复选框多选及全键盘网格巡航。",
        "specPath": "skills/ui-motion/advanced-charts/data-grid.md",
        "demoPath": "inbox/19_Advanced_charts/data-grid/index.html"
      },
      {
        "slug": "race-bar-chart",
        "title": "Race Bar Chart · 动态竞速条形图",
        "summary": "展示多分类或产品随时间推移的位次竞争与数值变迁的高表现力动态图表。通过物理阻尼弹性重排序（Row Reordering）、平滑插值数值滚动、时间线滑块巡航控制（Play/Pause/Scrubbing）以及视口可见性联动，在 60fps 下真实再现排名上下超车与柱宽动态伸缩。",
        "specPath": "skills/ui-motion/advanced-charts/race-bar-chart.md",
        "demoPath": "inbox/19_Advanced_charts/race-bar-chart/index.html"
      },
      {
        "slug": "sankey-flow",
        "title": "Sankey Flow · 桑基流向图",
        "summary": "展示用户转化路径、能量损耗或资金流向的多阶段有向流动图表。包含双向三次贝塞尔流带曲线（Cubic Bezier Ribbons）、前向与后向全链路高亮透镜（Forward/Backward Path Highlighting）、流带内部轻量级微粒子流动 Canvas 动画，以及响应式阶段自适应布局。",
        "specPath": "skills/ui-motion/advanced-charts/sankey-flow.md",
        "demoPath": "inbox/19_Advanced_charts/sankey-flow/index.html"
      },
      {
        "slug": "streamgraph",
        "title": "Streamgraph · 流水堆叠面积图",
        "summary": "用于呈现多个类别或主题随连续时间消长演化的有机流状图表。基于李·拜伦（Lee Byron）Wiggle 摆动基准线算法消除由于单一基线累积引发的几何扭曲，结合流层内部自适应居中文本标签、图例悬停聚焦与显隐切换、十字发丝探针光标及全维数据提示卡片。",
        "specPath": "skills/ui-motion/advanced-charts/streamgraph.md",
        "demoPath": "inbox/19_Advanced_charts/streamgraph/index.html"
      },
      {
        "slug": "sunburst",
        "title": "Sunburst · 旭日旭日图",
        "summary": "以多层同心圆环展示复杂树状层级构成的径向数据可视化组件。支持层级无级缩放下钻（Hierarchical Zoom In/Out）、中心展台数值平滑形变联动、面包屑轨迹导航（Breadcrumb Trail）、右侧明细分类列表联动高亮，以及全键盘扇区巡航访问。",
        "specPath": "skills/ui-motion/advanced-charts/sunburst.md",
        "demoPath": "inbox/19_Advanced_charts/sunburst/index.html"
      },
      {
        "slug": "treemap",
        "title": "Treemap · 矩形树图",
        "summary": "以二维平面嵌套矩形面积呈现复杂树状层级构成的比例分布图表。基于正方形化（Squarified）几何分块算法保证各矩形长宽比接近黄金比例，支持两级层级渐进下钻与支点平滑展开动画（Zoom In/Out）、面包屑路径导航、悬停多级链路关联高亮，以及全键盘方向键空间巡航。",
        "specPath": "skills/ui-motion/advanced-charts/treemap.md",
        "demoPath": "inbox/19_Advanced_charts/treemap/index.html"
      }
    ]
  },
  {
    "num": "20",
    "id": "tables",
    "inboxDir": "20_Tables",
    "desc": "即时聊天对话流、嵌套评论回复树、JSON 探针查看器、列排序列宽数据表、层级文件目录树",
    "count": 5,
    "items": [
      {
        "slug": "chat-thread",
        "title": "Chat Thread 对话流消息列表",
        "summary": "`chat-thread` 专为即时通讯、客服工单、协作会话与 AI 对话流设计的现代聊天消息组件。原生 Vanilla 实现，支持同作者 5 分钟智能合组、消息滑入弹簧过渡、底部磁吸与未读悬浮胶囊、多表情回应弹簧计数、图片/附件托盘与自适应高度输入框。",
        "specPath": "skills/ui-motion/tables/chat-thread.md",
        "demoPath": "inbox/20_Tables/chat-thread/index.html"
      },
      {
        "slug": "comment-thread",
        "title": "Comment Thread 分层嵌套评论树",
        "summary": "`comment-thread` 专为协作审阅、代码审查、长文批注与社区讨论设计的多层嵌套评论树组件。原生 Vanilla 实现，支持递归树状回复、平滑折叠展开高弹性弹簧过渡、原地行内回复框、表情反应徽标与线程解决/重开状态切换。",
        "specPath": "skills/ui-motion/tables/comment-thread.md",
        "demoPath": "inbox/20_Tables/comment-thread/index.html"
      },
      {
        "slug": "json-viewer",
        "title": "JSON Viewer 交互式数据树与搜索探针",
        "summary": "`json-viewer` 专为 API 调试面板、审计日志分析、配置项查看与开发者工具设计的高保真 JSON 数据可视化树组件。原生 Vanilla 实现，支持任意层级嵌套展开与折叠、关键字全文实时高亮与匹配计数跳转、键值语法高亮、单键路径与值一键复制反馈。",
        "specPath": "skills/ui-motion/tables/json-viewer.md",
        "demoPath": "inbox/20_Tables/json-viewer/index.html"
      },
      {
        "slug": "sortable-data-table",
        "title": "Sortable Data Table 可排序与行选择交互数据表格",
        "summary": "`sortable-data-table` 专为管理后台、项目面板、订单结算列表与用户数据中心设计的高级交互表格组件。原生 Vanilla 实现，支持多列头升降序切换、FLIP 物理弹簧行位移重排（400ms）、全选/部分选中（Indeterminate）状态切换、Shift 连击多选、悬浮选中状态胶囊与响应式卡片流降级。",
        "specPath": "skills/ui-motion/tables/sortable-data-table.md",
        "demoPath": "inbox/20_Tables/sortable-data-table/index.html"
      },
      {
        "slug": "tree-view",
        "title": "Tree View 阶梯缩进与折叠文件树",
        "summary": "`tree-view` 专为 IDE 侧边栏、项目代码浏览、企业组织架构与分类目检索设计的高灵动树状目录视图组件。原生 Vanilla 实现，支持任意深度嵌套文件夹开合、行高弹簧平滑过渡（38px）、逐项微差阶梯入场（35ms Stagger）、文件夹图标形态缩放置换、平滑游动选中底色胶囊与符合 WAI-ARIA 规范的全套键盘巡航。",
        "specPath": "skills/ui-motion/tables/tree-view.md",
        "demoPath": "inbox/20_Tables/tree-view/index.html"
      }
    ]
  },
  {
    "num": "21",
    "id": "activity",
    "inboxDir": "21_Activity",
    "desc": "年度活跃热力图、空状态引导插画、多维筛选过滤工具栏",
    "count": 3,
    "items": [
      {
        "slug": "activity-heatmap",
        "title": "Activity Heatmap · 活动热力图",
        "summary": "展示全年或周期性贡献与活动分布的网格日历热力图。核心动效包括进入视口的对角线波浪着色展开、年份切换方向性重着色、光标吸附与平滑滑动的提示气泡、图例强度过滤渐暗、选中高亮框平滑位移以及统计数字滚轮递增。",
        "specPath": "skills/ui-motion/activity/activity-heatmap.md",
        "demoPath": "inbox/21_Activity/activity-heatmap/index.html"
      },
      {
        "slug": "empty-state",
        "title": "Empty State · 空状态反馈",
        "summary": "数据或任务为空时的引导与占位视图。核心动效包含图标与文案的键控微模糊交叉置换（Micro-blur State Swap）、外层卡片高度自适应平滑弹簧形变、入场缩放阻尼以及行动按钮物理微按压回弹。",
        "specPath": "skills/ui-motion/activity/empty-state.md",
        "demoPath": "inbox/21_Activity/empty-state/index.html"
      },
      {
        "slug": "filter-toolbar",
        "title": "Filter Toolbar · 筛选工具栏",
        "summary": "高交互密度的动态数据过滤工具栏。核心动效包含“添加筛选”按钮向下拉菜单的卡片形态形变（Morphing Popover）、过滤标签（Pill）动态插入与删除时的宽度弹性拉伸与收缩、标签数值变更时的微模糊置换、以及全部条件清空时的平滑高度过渡。",
        "specPath": "skills/ui-motion/activity/filter-toolbar.md",
        "demoPath": "inbox/21_Activity/filter-toolbar/index.html"
      }
    ]
  },
  {
    "num": "22",
    "id": "media",
    "inboxDir": "22_Media",
    "desc": "手势轮播画廊、媒体文件拖拽上传区、双图卷帘对比",
    "count": 3,
    "items": [
      {
        "slug": "carousel",
        "title": "Carousel · 媒体轮播卡",
        "summary": "多媒体与富卡片轮播滑块。核心动效包含指针对齐吸附与惯性投影（Momentum Projection）、边缘弹性阻尼（Rubberband）、相邻卡片焦点缩放与渐隐、滑动高光指示条（Gliding Pill Indicator）以及悬停/聚焦暂停的自动轮播进度流转。",
        "specPath": "skills/ui-motion/media/carousel.md",
        "demoPath": "inbox/22_Media/carousel/index.html"
      },
      {
        "slug": "file-dropzone",
        "title": "File Dropzone · 媒体文件投递区",
        "summary": "专为多媒体资产（图像、视频、设计素材）上传设计的互动文件投递区。核心动效包含三层素材卡片 3D 扇形展开（Three Sheets Fan-out）、SVG 环绕虚线边缘呼吸律动（Drop Breathe Animation）、多类型文件进度条平滑填充、失败项重试旋转以及条目移除时的高度折叠与淡出。",
        "specPath": "skills/ui-motion/media/file-dropzone.md",
        "demoPath": "inbox/22_Media/file-dropzone/index.html"
      },
      {
        "slug": "image-compare",
        "title": "Image Compare · 图像对比滑块",
        "summary": "双图前后效果分割对比滑块。核心动效包含分界线与胶囊手柄的指针拖拽跟随（Pointer Drag & Catch-up Lag）、边缘弹性拉伸（Edge Rubberband）、双向（横向/纵向）90° 旋转形变切换（Quarter-turn Polygon Clip）、双击居中复位以及键盘无障碍步进。",
        "specPath": "skills/ui-motion/media/image-compare.md",
        "demoPath": "inbox/22_Media/image-compare/index.html"
      }
    ]
  },
  {
    "num": "23",
    "id": "text-effects",
    "inboxDir": "23_Text_effects",
    "desc": "视口滚动触发标题、字符平滑形变、逐字翻转揭示、流光文字扫光",
    "count": 4,
    "items": [
      {
        "slug": "in-view-title",
        "title": "In-view Title · 视口入场标题",
        "summary": "元素滚入浏览器视口时触发的高级标题入场动效。支持 Blur（高斯模糊浮显）、Words（逐词遮罩升起）、Lines（逐行自下而上滑入）、Tracking（字距展开）以及 Wipe（横向裁切擦除）五种动效模式。核心机制基于 IntersectionObserver 视口占比检测、越过视口顶部的 passed 状态锁定、以及优雅的纯 CSS 离线兜底。",
        "specPath": "skills/ui-motion/text-effects/in-view-title.md",
        "demoPath": "inbox/23_Text_effects/in-view-title/index.html"
      },
      {
        "slug": "text-morph",
        "title": "Text Morph · 字形平滑形变",
        "summary": "高保真单行文案平滑字形形变与状态流转组件。核心动效包含新旧字符按出现频次复用（Keyed Character Reuse）、相同字符平滑弹簧位移、退场字符绝对脱轨模糊淡出、进场字符错峰升起模糊淡入、以及外层容器宽度自适应弹性收敛（Zero-Jitter Container Width Morph）。",
        "specPath": "skills/ui-motion/text-effects/text-morph.md",
        "demoPath": "inbox/23_Text_effects/text-morph/index.html"
      },
      {
        "slug": "text-reveal",
        "title": "Text Reveal · 逐词文本浮现",
        "summary": "标题与正文段落的高品质逐词浮现入场动效。核心动效包含三条独立的 CSS 关键帧轨道（位移 760ms、透明度 440ms、高斯清晰度 580ms）、基于自然空格智能分词、动态自适应错峰步长、遮罩羽化为下行字母留白、以及动画结束后释放滤镜以保障文字字体清晰原生渲染。",
        "specPath": "skills/ui-motion/text-effects/text-reveal.md",
        "demoPath": "inbox/23_Text_effects/text-reveal/index.html"
      },
      {
        "slug": "text-shimmer",
        "title": "Text Shimmer · 文本扫光微动效",
        "summary": "文本表面高品质动态流光与扫描微动效。核心机制包含 2.2em 光带周期性扫掠（Shimmer Light Band）、32% 周期驻留微憩、离屏视口自动暂停、完成态光带平滑滑出（Settle Glide）、文字微模糊置换（Micro-blur Text Swap）以及图标矢量变异至成功对勾。",
        "specPath": "skills/ui-motion/text-effects/text-shimmer.md",
        "demoPath": "inbox/23_Text_effects/text-shimmer/index.html"
      }
    ]
  },
  {
    "num": "24",
    "id": "docks-and-tabs",
    "inboxDir": "24_Docks_and_tabs",
    "desc": "动作原位形变、Mac 风格浮动 Dock 栏、流体水滴 Tab 栏、形态变换导航条、同心圆环绕菜单、分享面板",
    "count": 6,
    "items": [
      {
        "slug": "action-morph",
        "title": "Action Morph · 浮动操作形变面板",
        "summary": "浮动操作按钮（FAB）在原地物理形变为多级操作菜单及就地录入表单，通过弹簧插值连续同步外壳宽高与圆角，实现零跳变内容交接与异步反馈。",
        "specPath": "skills/ui-motion/docks-and-tabs/action-morph.md",
        "demoPath": "inbox/24_Docks_and_tabs/action-morph/index.html"
      },
      {
        "slug": "dock",
        "title": "Dock · 浮动工具栏与形状托盘",
        "summary": "集成子工具托盘有机形变、滑动高光、温和提示气泡与机械数字滚轮的浮动应用工具栏。",
        "specPath": "skills/ui-motion/docks-and-tabs/dock.md",
        "demoPath": "inbox/24_Docks_and_tabs/dock/index.html"
      },
      {
        "slug": "liquid-tab-bar",
        "title": "Liquid Tab Bar · 液态拉伸标签栏",
        "summary": "具有双边缘黏性流动形变、圆角剪裁反色高光、文字插槽动态伸缩与惯性拖拽吸附的流体导航栏。",
        "specPath": "skills/ui-motion/docks-and-tabs/liquid-tab-bar.md",
        "demoPath": "inbox/24_Docks_and_tabs/liquid-tab-bar/index.html"
      },
      {
        "slug": "morph-nav",
        "title": "Morph Nav · 形变导航条",
        "summary": "单壳体表面自适应测量多级大型内容面板（Mega Menu），结合弹簧连续插值宽高与圆角、方向性微模糊交接和共享高光药丸的顶栏导航系统。",
        "specPath": "skills/ui-motion/docks-and-tabs/morph-nav.md",
        "demoPath": "inbox/24_Docks_and_tabs/morph-nav/index.html"
      },
      {
        "slug": "orbit-menu",
        "title": "Orbit Menu · 环形放射菜单",
        "summary": "以触发点为圆心沿圆弧轨迹错峰展开、集成磁吸透镜吸附、手势牵引绳与矢量图标形变的放射型交互菜单。",
        "specPath": "skills/ui-motion/docks-and-tabs/orbit-menu.md",
        "demoPath": "inbox/24_Docks_and_tabs/orbit-menu/index.html"
      },
      {
        "slug": "share-sheet",
        "title": "Share Sheet · 分享面板与抽屉",
        "summary": "桌面端原地物理弹簧形变展开、移动端自适应底部滑出抽屉并支持手势拖拽关闭与链接复制反馈的协作分享面板。",
        "specPath": "skills/ui-motion/docks-and-tabs/share-sheet.md",
        "demoPath": "inbox/24_Docks_and_tabs/share-sheet/index.html"
      }
    ]
  },
  {
    "num": "25",
    "id": "glass",
    "inboxDir": "25_Glass",
    "desc": "光泽磨砂卡片、浮动毛玻璃上下文菜单、毛玻璃底部标签栏",
    "count": 3,
    "items": [
      {
        "slug": "glass-card",
        "title": "Glass Card · 玻璃拟态卡片",
        "summary": "集成 3D 空间弹簧倾斜、动态径向反光菲涅尔透镜、内容高度平滑展开与微模糊渐显的高质感毛玻璃名片。",
        "specPath": "skills/ui-motion/glass/glass-card.md",
        "demoPath": "inbox/25_Glass/glass-card/index.html"
      },
      {
        "slug": "glass-menu",
        "title": "Glass Menu · 玻璃拟态菜单",
        "summary": "自触发器物理平滑形变为毛玻璃菜单、支持子菜单横向交接自适应高度测量、滑动高光胶囊与就地撤销通知的高端浮动菜单。",
        "specPath": "skills/ui-motion/glass/glass-menu.md",
        "demoPath": "inbox/25_Glass/glass-menu/index.html"
      },
      {
        "slug": "glass-tabbar",
        "title": "Glass Tabbar · 玻璃拟态标签栏",
        "summary": "集成速度拉伸与浮起物理的玻璃透镜、水平手势擦动吸附、随页面滚动自适应高度折叠与独立搜索胶囊的主导航标签栏。",
        "specPath": "skills/ui-motion/glass/glass-tabbar.md",
        "demoPath": "inbox/25_Glass/glass-tabbar/index.html"
      }
    ]
  },
  {
    "num": "26",
    "id": "surfaces",
    "inboxDir": "26_Surfaces",
    "desc": "控制中心磁贴面板、3D 全息翻转卡片、链接预览展开胶囊、多层抽屉堆叠、纵向折叠卡包",
    "count": 5,
    "items": [
      {
        "slug": "control-center",
        "title": "Control Center · 控制中心表面",
        "summary": "包含磁贴到全量详情面板的共享几何投影形变、子元素逆缩放校正、弹性微调滑块与径向时间拨盘的综合控制台。",
        "specPath": "skills/ui-motion/surfaces/control-center.md",
        "demoPath": "inbox/26_Surfaces/control-center/index.html"
      },
      {
        "slug": "holo-card",
        "title": "Holo Card · 全息双面卡片",
        "summary": "集成双独立弹簧（倾斜 vs 光泽）、数学三角函数驱动的全息彩虹彩膜、闪粉微粒反光与有方向性 3D 翻转的数字会员卡。",
        "specPath": "skills/ui-motion/surfaces/holo-card.md",
        "demoPath": "inbox/26_Surfaces/holo-card/index.html"
      },
      {
        "slug": "link-unfurl",
        "title": "Link Unfurl · 链接展开卡片",
        "summary": "从行内文本胶囊（Inline Chip）到外层富媒体大卡片的非对称双轴形变（水平优先、垂直跟随）、Favicon 锚定坐标投影、半隐式欧拉弹簧与手势下拉折叠。",
        "specPath": "skills/ui-motion/surfaces/link-unfurl.md",
        "demoPath": "inbox/26_Surfaces/link-unfurl/index.html"
      },
      {
        "slug": "sheet-stack",
        "title": "Sheet Stack · 抽屉堆叠表面",
        "summary": "多层级任务跳转（Settings → Profile → Photo Picker）的深度透视缩放（depthScale 0.05）、物理回弹弹簧、下拉阻尼滑动释放（Dismiss）手势与严密焦点陷阱隔离。",
        "specPath": "skills/ui-motion/surfaces/sheet-stack.md",
        "demoPath": "inbox/26_Surfaces/sheet-stack/index.html"
      },
      {
        "slug": "wallet-stack",
        "title": "Wallet Stack · 钱包堆叠卡包",
        "summary": "多张卡片的纵向 3D 深度堆叠与展开管理系统，采用临界阻尼弹簧、速度投射衰减、临界跟随限速、光泽与 3D 倾斜陀螺仪。",
        "specPath": "skills/ui-motion/surfaces/wallet-stack.md",
        "demoPath": "inbox/26_Surfaces/wallet-stack/index.html"
      }
    ]
  },
  {
    "num": "27",
    "id": "galleries",
    "inboxDir": "27_Galleries",
    "desc": "3D 封面流转、灯箱全屏画廊、瀑布流照片网格、电商商品多图联动画廊",
    "count": 4,
    "items": [
      {
        "slug": "cover-flow",
        "title": "Cover Flow · 3D 封面流",
        "summary": "用于专辑封面、路线画廊、电影海报等富媒体序列展示的立体透视轮播组件。",
        "specPath": "skills/ui-motion/galleries/cover-flow.md",
        "demoPath": "inbox/27_Galleries/cover-flow/index.html"
      },
      {
        "slug": "lightbox-gallery",
        "title": "Lightbox Gallery · 瀑布流画廊与灯箱",
        "summary": "用于摄影作品集、旅行相册与图片流展示的高性能自适应瀑布流与全屏共享元素灯箱组件。",
        "specPath": "skills/ui-motion/galleries/lightbox-gallery.md",
        "demoPath": "inbox/27_Galleries/lightbox-gallery/index.html"
      },
      {
        "slug": "photo-grid",
        "title": "Photo Grid · 多列相片网格与查看器",
        "summary": "用于相册图库、摄影资产库与时间线流的高性能可缩放网格与内嵌大图查看器组件。",
        "specPath": "skills/ui-motion/galleries/photo-grid.md",
        "demoPath": "inbox/27_Galleries/photo-grid/index.html"
      },
      {
        "slug": "product-gallery",
        "title": "Product Gallery · 电商商品画廊",
        "summary": "用于电商商品详情页（PDP）、多规格配置与硬件橱窗展示的高交互质感画廊组件。",
        "specPath": "skills/ui-motion/galleries/product-gallery.md",
        "demoPath": "inbox/27_Galleries/product-gallery/index.html"
      }
    ]
  },
  {
    "num": "28",
    "id": "audio-and-video",
    "inboxDir": "28_Audio_and_video",
    "desc": "正在播放动态胶囊、AI 语音脉冲光球、语音录制声波条",
    "count": 3,
    "items": [
      {
        "slug": "now-playing",
        "title": "Now Playing · 音乐播放胶囊与大卡片",
        "summary": "用于流媒体音频、播客应用与背景音乐播放的高性能常驻迷你胶囊与大卡片展开组件。",
        "specPath": "skills/ui-motion/audio-and-video/now-playing.md",
        "demoPath": "inbox/28_Audio_and_video/now-playing/index.html"
      },
      {
        "slug": "voice-orb",
        "title": "Voice Orb · 语音助手光球",
        "summary": "用于 AI 智能语音助手、对话终端与实时语音交互的可视化全息流体光球与字幕流转组件。",
        "specPath": "skills/ui-motion/audio-and-video/voice-orb.md",
        "demoPath": "inbox/28_Audio_and_video/voice-orb/index.html"
      },
      {
        "slug": "voice-recorder",
        "title": "Voice Recorder · 语音录音胶囊与气泡",
        "summary": "用于即时通讯聊天面板、语音留言与备忘录应用的原生录制胶囊展开与消息气泡生成流转组件。",
        "specPath": "skills/ui-motion/audio-and-video/voice-recorder.md",
        "demoPath": "inbox/28_Audio_and_video/voice-recorder/index.html"
      }
    ]
  },
  {
    "num": "29",
    "id": "special-data",
    "inboxDir": "29_Special_data",
    "desc": "三环活动健身圆环、预订状态时段胶囊、滚筒日期轮盘、时钟刻度表盘",
    "count": 4,
    "items": [
      {
        "slug": "activity-rings",
        "title": "Activity Rings · 活动同心圆环",
        "summary": "用于多维度目标完成率追踪、习惯打卡与多指标统计的高质感同心刻度环与周记录联动组件。",
        "specPath": "skills/ui-motion/special-data/activity-rings.md",
        "demoPath": "inbox/29_Special_data/activity-rings/index.html"
      },
      {
        "slug": "booking-pill",
        "title": "Booking Pill · 浮动预约胶囊",
        "summary": "用于餐厅订座、活动预约与时段订购的多步骤原地物理变形胶囊组件。",
        "specPath": "skills/ui-motion/special-data/booking-pill.md",
        "demoPath": "inbox/29_Special_data/booking-pill/index.html"
      },
      {
        "slug": "date-reel",
        "title": "Date Reel · 3D 滚筒时间选择盘",
        "summary": "用于精确排期、定时发送与日程预约的四列 3D 滚筒滚轮时间选择器。",
        "specPath": "skills/ui-motion/special-data/date-reel.md",
        "demoPath": "inbox/29_Special_data/date-reel/index.html"
      },
      {
        "slug": "time-dial",
        "title": "Time Dial · 24小时极坐标多时区罗盘",
        "summary": "用于跨国团队协作、多时区会议安排与全球时间同步的 24 小时极坐标表盘罗盘。",
        "specPath": "skills/ui-motion/special-data/time-dial.md",
        "demoPath": "inbox/29_Special_data/time-dial/index.html"
      }
    ]
  },
  {
    "num": "30",
    "id": "special-type",
    "inboxDir": "30_Special_type",
    "desc": "机械键帽键盘按压、沙漏重力文字、老虎机滚轮字符、打字机终端控制台",
    "count": 4,
    "items": [
      {
        "slug": "keycap-keyboard",
        "title": "Keycap Keyboard · 机械键帽虚拟键盘",
        "summary": "拟真机械键帽交互键盘。核心动效机制包括：",
        "specPath": "skills/ui-motion/special-type/keycap-keyboard.md",
        "demoPath": "inbox/30_Special_type/keycap-keyboard/index.html"
      },
      {
        "slug": "sand-text",
        "title": "Sand Text · 沙粒重构物理文字",
        "summary": "由动态沙粒重力沉降与气流吹散组成的物理文字。",
        "specPath": "skills/ui-motion/special-type/sand-text.md",
        "demoPath": "inbox/30_Special_type/sand-text/index.html"
      },
      {
        "slug": "slot-text",
        "title": "Slot Text · 滚轮字符数字滚动",
        "summary": "金融与统计级平滑逐列滚轮字符组件。核心动效机制包括：",
        "specPath": "skills/ui-motion/special-type/slot-text.md",
        "demoPath": "inbox/30_Special_type/slot-text/index.html"
      },
      {
        "slug": "typewriter-terminal",
        "title": "Typewriter Terminal · 拟真终端打字机",
        "summary": "基于时序时间线的代码安装与终端会话演示终端。",
        "specPath": "skills/ui-motion/special-type/typewriter-terminal.md",
        "demoPath": "inbox/30_Special_type/typewriter-terminal/index.html"
      }
    ]
  },
  {
    "num": "31",
    "id": "loaders",
    "inboxDir": "31_Loaders",
    "desc": "几何形态循环形变、骨架屏就地内容展开、橡皮筋手势下拉刷新",
    "count": 3,
    "items": [
      {
        "slug": "morph-loader",
        "title": "Morph Loader · 连续几何形变加载器",
        "summary": "基于 SVG 路径插值与物理弹簧的几何形态无缝变换加载器。",
        "specPath": "skills/ui-motion/loaders/morph-loader.md",
        "demoPath": "inbox/31_Loaders/morph-loader/index.html"
      },
      {
        "slug": "skeleton-morph",
        "title": "Skeleton Morph · 骨架屏就地内容形变",
        "summary": "基于 FLIP 几何测量与自适应高度缓动的骨架屏内容显露组件。",
        "specPath": "skills/ui-motion/loaders/skeleton-morph.md",
        "demoPath": "inbox/31_Loaders/skeleton-morph/index.html"
      },
      {
        "slug": "stretch-refresh",
        "title": "Stretch Refresh · 弹性阻尼下拉刷新",
        "summary": "具备分层张力位移与非线性阻尼的列表下拉刷新微交互。",
        "specPath": "skills/ui-motion/loaders/stretch-refresh.md",
        "demoPath": "inbox/31_Loaders/stretch-refresh/index.html"
      }
    ]
  },
  {
    "num": "32",
    "id": "playful",
    "inboxDir": "32_Playful",
    "desc": "同心圆轨道漫游展台、仿真折纸书页",
    "count": 2,
    "items": [
      {
        "slug": "orbit-logos",
        "title": "Orbit Logos · 双同心轨道集成图标坞",
        "summary": "基于双层同心圆轨道与多频物理阻尼的图标环形漫游与详情卡片展开组件。",
        "specPath": "skills/ui-motion/playful/orbit-logos.md",
        "demoPath": "inbox/32_Playful/orbit-logos/index.html"
      },
      {
        "slug": "page-curl",
        "title": "Page Curl · 拟真折纸翻页",
        "summary": "基于折痕裁切几何与物理阻尼的仿真书籍/画册翻页微动效。",
        "specPath": "skills/ui-motion/playful/page-curl.md",
        "demoPath": "inbox/32_Playful/page-curl/index.html"
      }
    ]
  },
  {
    "num": "33",
    "id": "cursor",
    "inboxDir": "33_Cursor",
    "desc": "磁性点阵矩阵追踪、引力井中心吸附",
    "count": 2,
    "items": [
      {
        "slug": "dot-grid",
        "title": "Dot Grid · 交互式光标排斥点阵",
        "summary": "基于 Canvas 2D 物理动力学的网格点阵排斥与波纹交互组件。",
        "specPath": "skills/ui-motion/cursor/dot-grid.md",
        "demoPath": "inbox/33_Cursor/dot-grid/index.html"
      },
      {
        "slug": "gravity-well",
        "title": "Gravity Well · 交互式光标引力情绪板",
        "summary": "基于光标引力吸附与扩散脉冲波的图片网格物理微交互。",
        "specPath": "skills/ui-motion/cursor/gravity-well.md",
        "demoPath": "inbox/33_Cursor/gravity-well/index.html"
      }
    ]
  },
  {
    "num": "34",
    "id": "illustrations",
    "inboxDir": "34_Illustrations",
    "desc": "流式管道数据流、多区域故障转移重路由、支付流向状态机、高维向量空间检索",
    "count": 4,
    "items": [
      {
        "slug": "data-flow",
        "title": "Data Flow · 数据流管道示意图",
        "summary": "基于离散采样路径、形态融合与实时吞吐计数的动态 ETL 数据流架构示意图。",
        "specPath": "skills/ui-motion/illustrations/data-flow.md",
        "demoPath": "inbox/34_Illustrations/data-flow/index.html"
      },
      {
        "slug": "multi-region-failover",
        "title": "Multi-Region Failover · 多区域容灾故障切换示意图",
        "summary": "基于等轴测 2.5D 矢量拓扑与健康检查时序的多区域高可用架构演练示意图。",
        "specPath": "skills/ui-motion/illustrations/multi-region-failover.md",
        "demoPath": "inbox/34_Illustrations/multi-region-failover/index.html"
      },
      {
        "slug": "payment-flow",
        "title": "Payment Flow · 四方支付授权结算流转图",
        "summary": "基于四方支付体系（客户、商户、网关、银行）的授权、批准与结算全流程微动效架构图。",
        "specPath": "skills/ui-motion/illustrations/payment-flow.md",
        "demoPath": "inbox/34_Illustrations/payment-flow/index.html"
      },
      {
        "slug": "vector-search",
        "title": "Vector Search · 向量检索与聚类图解",
        "summary": "基于高维向量投影、聚类拓扑与最近邻图遍历的向量检索（Vector Search）动态演示图解。",
        "specPath": "skills/ui-motion/illustrations/vector-search.md",
        "demoPath": "inbox/34_Illustrations/vector-search/index.html"
      }
    ]
  }
];
window.UI_MOTION_AVATARS = ["data:image/jpeg;base64,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","data:image/jpeg;base64,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","data:image/jpeg;base64,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","data:image/jpeg;base64,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"];
