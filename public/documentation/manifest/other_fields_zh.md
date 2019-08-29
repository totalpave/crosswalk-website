# 其他字段

其余的两个manifest扩展，`通过Crosswalk manifest添加的xwalk_description`和`xwalk_version`，用于添加应用具体的元数据。

- `xwalk_version`: 应用的版本。如果呈现，它将被包含在包名中。
- `xwalk_description`: 应用的描述。当前这个字段对于打包没有影响。
- `xwalk_bounds`: 在manifest中窗口大小的配置。只针对桌面应用。

示例：

    {
      "name": "app name",
      "start_url": "index.html",
      "orientation": "portrait",
      "xwalk_version": "1.0.0",
      "xwalk_description": "A sample application",
      "xwalk_bounds": {
          "width": 500,
          "height": 600,
          "min-width": 250,
          "min-height": 300,
          "max-width": 800,
          "max-height": 1000
      }
    }
