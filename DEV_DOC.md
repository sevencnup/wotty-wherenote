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
### v0.2.0 (2026-07-22)
- 新增:编辑/新增页支持拍照记录,走系统相机 + FileProvider 保存到 filesDir/photos。
- Note 实体增加 photoPath 字段;Room 升 v2,采用 fallbackToDestructiveMigration。
- 列表卡片展示缩略图;删除记录时一并清理照片文件。
- versionCode 2 / versionName 0.2.0。

### v0.1.0 (2026-07-22)
- 初始骨架:Jetpack Compose + Room + Material3。
- 实现记录的增、列表、搜索、编辑、删除 MVP 流程。
- 配置 Gradle wrapper,可通过命令行构建。