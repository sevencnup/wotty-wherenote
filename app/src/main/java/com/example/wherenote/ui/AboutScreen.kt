package com.example.wherenote.ui

import android.content.Intent
import android.net.Uri
import android.widget.Toast
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Public
import androidx.compose.material3.Button
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@Composable
fun AboutContent(modifier: Modifier = Modifier) {
    val context = LocalContext.current
    // 更新地址暂留空,后续填入实际 URL 即可启用跳转
    val updateUrl = ""
    val siteUrl = "https://wherenote.sevencn.com"

    Column(
        modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(Modifier.height(16.dp))
        Text("随记", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
        Text("WhereNote", style = MaterialTheme.typography.labelLarge, color = MaterialTheme.colorScheme.outline)

        Spacer(Modifier.height(8.dp))
        Text(
            "丢三落四、随手放找不到？阿巴阿巴.....这是一款记录「东西放在哪里」的小工具。随手记一笔:物品、位置、备注、照片," +
                "以后搜索即可找回,再不用翻箱倒柜找东西，芜湖~",
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(horizontal = 8.dp)
        )

        HorizontalDivider(Modifier.padding(vertical = 8.dp))
        Text("当前版本", style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.outline)
        Text("v0.2.5", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.SemiBold)

        Spacer(Modifier.height(4.dp))
        TextButton(onClick = {
            runCatching {
                context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(siteUrl)))
            }
        }) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.Public, contentDescription = null, modifier = Modifier.padding(end = 6.dp))
                Text(siteUrl.removePrefix("https://"))
            }
        }

        Spacer(Modifier.height(12.dp))
        Button(
            onClick = {
                if (updateUrl.isBlank()) {
                    Toast.makeText(context, "更新地址暂未配置", Toast.LENGTH_SHORT).show()
                }
                // 填入 updateUrl 后可在此用 Intent 跳转浏览器
            },
            modifier = Modifier.fillMaxWidth().height(48.dp)
        ) { Text("检查更新") }
    }
}