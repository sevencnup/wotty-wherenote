package com.example.wherenote.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AboutScreen() {
    Scaffold(
        topBar = { TopAppBar(title = { Text("关于") }) }
    ) { pad ->
        Column(
            Modifier
                .padding(pad)
                .padding(16.dp)
                .fillMaxWidth()
                .verticalScroll(rememberScrollState()),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Text("随记 WhereNote", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
            Text(
                "一款记录「东西放在哪里」的小工具。随手记一笔:物品、位置、备注、照片," +
                    "以后搜索即可找回,再不用翻箱倒柜找东西。",
                style = MaterialTheme.typography.bodyMedium
            )

            HorizontalDivider()
            Text("当前版本", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
            Text("v0.2.1  (versionCode 3)", style = MaterialTheme.typography.bodyMedium)

            HorizontalDivider()
            Text("更新记录", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
            Text("• v0.2.1  底部三栏导航:记住 / 东西在哪 / 关于", style = MaterialTheme.typography.bodySmall)
            Text("• v0.2.0  拍照记录、列表缩略图展示", style = MaterialTheme.typography.bodySmall)
            Text("• v0.1.0  初始版本:记录的增删查改 + 关键字搜索", style = MaterialTheme.typography.bodySmall)

            HorizontalDivider()
            Text("技术栈", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
            Text(
                "Kotlin 2.0.21\nJetpack Compose + Material3\nRoom 本地数据库\nGradle 8.9 / AGP 8.7.3",
                style = MaterialTheme.typography.bodySmall
            )
        }
    }
}