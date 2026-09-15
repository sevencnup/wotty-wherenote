# 随记 (WhereNote) 开发文档

## 一、项目简介
一款 Android 随记 App,核心场景:**记录"什么东西放在了哪里"**。
打开 App 快速记一条:物品名称 + 位置 + 备注,以后搜索/列表查看即可找回。

## 二、功能范围(MVP)
1. 新增记录:物品名、位置、备注、时间戳。
2. 列表查看:按时间倒序展示所有记录,支持搜索过滤。
3. 详情/编辑:点选某条记录可编辑或删除。
4. 本地持久化:Room 数据库,离线可用。
5. 实时预览开发体验:Jetpack Compose `@Preview` + Android Studio Live Edit。

## 三、技术栈
| 项 | 选型 |
|---|---|
| 语言 | Kotlin 2.0.21 |
| UI | Jetpack Compose + Material3 (BOM 2024.12.01) |
| 构建 | Gradle 8.9 + AGP 8.7.3 |
| 数据库 | Room 2.6.1 |
| 最低 SDK | 26 (Android 8.0) |
| 目标/编译 SDK | 35 |
| JDK | 21 |

## 四、目录结构
```
WhereNote/
  settings.gradle.kts
  build.gradle.kts
  gradle.properties
  local.properties          (本地 SDK 路径,不入库)
  gradle/wrapper/...
  gradlew / gradlew.bat
  app/
    build.gradle.kts
    src/main/AndroidManifest.xml
    src/main/java/com/example/wherenote/
      MainActivity.kt
      data/Note.kt  NoteDao.kt  AppDatabase.kt
      ui/NoteViewModel.kt  ScreenList.kt  ScreenEdit.kt  Theme.kt
    src/main/res/...
```

## 五、构建与运行
- 命令行:`./gradlew assembleDebug`(需 ANDROID_SDK_ROOT 或 local.properties)
- 安装到设备:`./gradlew installDebug`
- 在 Android Studio 中打开 WhereNote 目录可直接 Run / 用 `@Preview` 预览组件。

## 六、版本记录
### v0.3.0 当前版本发布构建 (2026-09-15)
- 切换应用网站与更新服务域名。
- 保持应用版本不变并生成独立发布包。

### v0.3.0 (2026-09-06)
- 将应用版本升级为 0.3.0，versionCode 12。
- 保留网站 API 检查更新与 APK 下载流程。

### v0.2.9 (2026-08-30)
- 使用新的 WhereNote Logo 替换关于页品牌标识与 Android 应用图标。
- “记一笔”和“东西在哪”顶部移除 Logo 图标，仅保留文字标题。
- versionCode 11 / versionName 0.2.9。

### v0.2.8 (2026-08-30)
- 移除记一笔页顶部冗余的“记录新物品”提示模块。
- 收紧首页列表、顶栏状态区域、编辑页与关于页的模块高度和左右边距。
- 保留关键按钮最小触控尺寸，提升首页首屏信息密度。
- versionCode 10 / versionName 0.2.8。

### v0.2.7 (2026-08-30)
- 修复详情页照片无法点击放大查看的问题。
- 详情照片支持点击打开全屏预览，支持关闭按钮与系统返回关闭。
- versionCode 9 / versionName 0.2.7。

### v0.2.6 (2026-08-30)
- UI 全面升级为「精致森绿质感」设计风格。
- 主题配色升级：深林绿、鼠尾草绿与温润暖木棕搭配，统一 Typography 与 Shapes 圆角规范。
- 升级全局顶栏与胶囊导航底栏，加入物品数量徽标与平滑切换过渡。
- 升级「东西在哪」列表卡片：位置标签胶囊、大图详情弹窗与优雅空状态。
- 升级「记一笔/编辑」表单：分块卡片、拍照交互增强与状态反馈。
- 升级「关于随记」页：品牌卡片、核心特性一览与版本信息。
- versionCode 8 / versionName 0.2.6。

### v0.2.5 (2026-07-22)
- 拍照后自动压缩:长边缩到 1080px、JPEG 质量 82,原地覆盖(原 ~3MB → 约 200KB 量级),显著降低存储增长。
- 关于页新增可点击网站链接 wherennote.sevencn.com,manifest 加 queries 允许拉起浏览器。
- versionCode 7 / versionName 0.2.5。

### v0.2.4 (2026-07-22)
- 点击记录改为从底部滑出 ModalBottomSheet 详情页(标题/位置/备注/大图/时间),不再跳转记住页。
- 详情页提供「编辑」(跳转记住页编辑)与「删除」按钮,补齐删除整条记录入口。
- versionCode 6 / versionName 0.2.4。

### v0.2.3 (2026-07-22)
- 修复拍照后图片不显示:旧代码从 FileProvider Uri 取路径得到的是 content-uri 段而非真实文件路径,改为保存 newPhotoTarget 返回的 File.absolutePath。
- 启动时自动修复历史错误 photoPath(把 /photos/xxx.jpg 形式的旧路径对回 filesDir,救回旧记录照片)。
- 搜索无结果时显示「未找到相关记录 + 关键词」,与「还没有记录」区分,便于确认搜索已生效。
- versionCode 5 / versionName 0.2.3。

### v0.2.2 (2026-07-22)
- 修复顶部「高额头」:改用单一 Scaffold,消除嵌套 Scaffold 导致的状态栏内边距叠加。
- 底部导航栏高度调低(80→60dp),去除多余系统内边距。
- UI 打磨:列表卡片改圆角浅色块、位置加定位图标、空状态加图标与提示、表单圆角输入框。
- 关于页精简:仅保留当前版本,新增「检查更新」按钮(地址暂空)。
- versionCode 4 / versionName 0.2.2。

### v0.2.1 (2026-07-22)
- 重构为底部三栏导航:记住(记录)/ 东西在哪(存档列表)/ 关于(软件介绍+版本)。
- 「记住」页为记录表单(新增/编辑),保存后跳转到「东西在哪」。
- 「关于」页展示软件介绍、当前版本与更新记录。
- 去除列表页冗余 FAB(记录入口统一到「记住」页)。
- versionCode 3 / versionName 0.2.1。

### v0.2.0 (2026-07-22)
- 新增:编辑/新增页支持拍照记录,走系统相机 + FileProvider 保存到 filesDir/photos。
- Note 实体增加 photoPath 字段;Room 升 v2,采用 fallbackToDestructiveMigration。
- 列表卡片展示缩略图;删除记录时一并清理照片文件。
- versionCode 2 / versionName 0.2.0。

### v0.1.0 (2026-07-22)
- 初始骨架:Jetpack Compose + Room + Material3。
- 实现记录的增、列表、搜索、编辑、删除 MVP 流程。
- 配置 Gradle wrapper,可通过命令行构建。

## 七、w.wotty.app 域名切换与 GitHub 发布

### 7.1 目标与约束
- 将应用内显示的网站地址和检查更新 API 地址从 `wherenote.wotty.app` 切换为 `w.wotty.app`。
- 保持 `versionCode = 12` 与 `versionName = 0.3.0` 不变。
- 不覆盖既有 APK；本次构建产物使用带域名和构建日期的独立文件名。
- 不覆盖现有 `v0.3.0` 标签或 Release；以独立 GitHub Release 标签发布本次当前版本构建。

### 7.2 执行步骤
- [x] 更新 `UpdateApi` 的更新服务地址及关于页的网站地址。
- [x] 确认版本号未发生变化，并执行 Debug APK 构建。
- [x] 将构建 APK 复制为独立命名的发布包，并校验 APK 元数据。
- [x] 提交域名切换代码并推送 GitHub。
- [x] 创建独立 GitHub Release，上传本次 APK，校验 Release 资源。
