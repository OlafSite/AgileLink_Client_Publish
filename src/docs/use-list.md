# 列表页设计

使用方法见系统管理各栏目列表

## 添加表格列字段

如选择了表单数据源，可从这里快速选择当前表单可用字段，其他更多字段可直接点击`生成脚本预览`编辑。

注意：如需使用操作栏内置操作按钮，操作栏的prop必须为`__control`，如：

```json
{
  "label": "操作",
  "prop": "__control"
}
```

内置按钮及事件可点击操作下面的设置，在字段属性里编辑事件按钮。其中key=edit/del会执行内置事件

```javascript
opt = [
  {
    label: "详情",
    click: (row) => {
      // 这里是逻辑代码，row当前行数据
    }
  },
  {
    label: "编辑",
    key: "edit"
  },
  {
    label: "删除",
    key: "del"
  }]
```

## 操作按钮

点击列表页按钮会触发`btnClick`事件

### 列表上方按钮

显示于列表左上方的按钮，可以编辑框编辑代码，其中key=add/del会执行内置事件。如：

```javascript
opt = [
  {
    label: '导出',
    click: () => {
      // 导出逻辑
    }
  },
  {
    label: "新增",
    key: "add", // add到新增页
    type: "primary",
    size: "small",
    icon: "plus"
  },
  {
    label: "批量删除",
    key: "del", // 执行内置删除事件
    type: "danger",
    size: "small",
    icon: "delete",
    click: () => {
      // 添加了add/del时，同时可以作相关逻辑判断。return false可阻止事件
    }
  }]
```

### 列表操作按钮

列表操作列按钮，如编辑、查看、删除等。其中key=edit/del会执行内置事件，方法同列表上方按钮。

**visible**

该属性可用于根据当前行数据决定是否显示，例如当数据status=1时显示按钮为禁用，=0时显示启用。支持运符串，其中$为当前行数据

```javascript
opt = [
  {
    label: "查看",
    click:(row)=>{
      // 查看逻辑，row为当前行数据
    },
    visible:'$.status===1' // 根据条件是否显示当前行按钮，即行数据status=1时可显示查看
  },
  {
    label: "编辑",
    key: "edit" // 打开编辑页
  },
  {
    label: "删除",
    key: "del", // 执行删除操作
    tip:'确定删除提示'
  }]
```

## 字段属性

## 数据列表配置

**•所属表单**

即当前数据列表的数据来源于哪个表单

**•横向滚动固定在底部**

表格为展开行和树形数据与懒加载时，应设置为false

效果可参考系统管理各栏目

**•可折叠查询表单**

列表会展示条件查询按钮，可收起或展下查询条件

**•操作列按钮下拉**

操作栏展示更多下拉按钮，详见[列表页设计管理](/#/design/dataList/list)

**•开启侧栏树**

### 接口数据事件

同表单设计事件，可参考表单设计
