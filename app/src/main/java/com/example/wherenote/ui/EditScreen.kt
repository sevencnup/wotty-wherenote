package com.example.wherenote.ui

import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CameraAlt
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.Button
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.wherenote.data.Note
import com.example.wherenote.util.PhotoUtil
import java.io.File

@Composable
fun EditContent(
    editing: Note?,
    onCancel: () -> Unit,
    onSave: (title: String, location: String, remark: String, photoPath: String?) -> Unit,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    var title by remember { mutableStateOf(editing?.title ?: "") }
    var location by remember { mutableStateOf(editing?.location ?: "") }
    var remark by remember { mutableStateOf(editing?.remark ?: "") }
    var photoPath by remember { mutableStateOf(editing?.photoPath) }
    var pendingUri by remember { mutableStateOf<Uri?>(null) }

    val camLauncher = rememberLauncherForActivityResult(ActivityResultContracts.TakePicture()) { ok ->
        if (ok && pendingUri != null) {
            photoPath = pendingUri!!.path?.let { File(it).absolutePath }
        }
        pendingUri = null
    }

    Column(
        modifier
            .fillMaxWidth()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(
            if (editing == null) "记一笔,东西放在哪了" else "修改这条记录",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.outline
        )
        OutlinedTextField(
            value = title, onValueChange = { title = it },
            label = { Text("物品名称 *") }, singleLine = true,
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(14.dp)
        )
        OutlinedTextField(
            value = location, onValueChange = { location = it },
            label = { Text("放在哪里") }, singleLine = true,
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(14.dp)
        )
        OutlinedTextField(
            value = remark, onValueChange = { remark = it },
            label = { Text("备注(可选)") },
            minLines = 3,
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(14.dp)
        )

        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            OutlinedButton(onClick = {
                val (file, uri) = PhotoUtil.newPhotoTarget(context)
                pendingUri = uri
                camLauncher.launch(uri)
            }) {
                Icon(Icons.Default.CameraAlt, contentDescription = null)
                Spacer(Modifier.padding(end = 4.dp))
                Text(if (photoPath == null) "拍照" else "重拍")
            }
            if (photoPath != null) {
                PhotoThumb(path = photoPath, sizeDp = 72.dp)
                IconButton(onClick = {
                    runCatching { File(photoPath!!).delete() }
                    photoPath = null
                }) { Icon(Icons.Default.Delete, contentDescription = "删除照片") }
            } else {
                Box(Modifier.size(72.dp), contentAlignment = Alignment.Center) {
                    Text("无照片", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.outline)
                }
            }
        }

        Spacer(Modifier.height(4.dp))
        Button(
            onClick = { onSave(title, location, remark, photoPath) },
            enabled = title.isNotBlank(),
            modifier = Modifier.fillMaxWidth().height(50.dp),
            shape = RoundedCornerShape(14.dp)
        ) { Text("保存", fontWeight = FontWeight.SemiBold) }
        TextButton(onClick = onCancel, modifier = Modifier.fillMaxWidth()) { Text("取消") }
    }
}