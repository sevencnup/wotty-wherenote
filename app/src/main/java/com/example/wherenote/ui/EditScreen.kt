package com.example.wherenote.ui

import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.CameraAlt
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import com.example.wherenote.data.Note
import com.example.wherenote.util.PhotoUtil
import java.io.File

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EditScreen(
    editing: Note?,
    onBack: () -> Unit,
    onSave: (title: String, location: String, remark: String, photoPath: String?) -> Unit
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

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(if (editing == null) "新增记录" else "编辑记录") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "返回")
                    }
                }
            )
        }
    ) { pad ->
        Column(
            Modifier.padding(pad).padding(16.dp).fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            OutlinedTextField(
                value = title, onValueChange = { title = it },
                label = { Text("物品名称 *") }, singleLine = true,
                modifier = Modifier.fillMaxWidth()
            )
            OutlinedTextField(
                value = location, onValueChange = { location = it },
                label = { Text("放在哪里") }, singleLine = true,
                modifier = Modifier.fillMaxWidth()
            )
            OutlinedTextField(
                value = remark, onValueChange = { remark = it },
                label = { Text("备注(可选)") },
                minLines = 3,
                modifier = Modifier.fillMaxWidth()
            )

            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                OutlinedButton(onClick = {
                    val (file, uri) = PhotoUtil.newPhotoTarget(context)
                    pendingUri = uri
                    camLauncher.launch(uri)
                }) {
                    Icon(Icons.Default.CameraAlt, contentDescription = null)
                    Text(if (photoPath == null) "拍照" else "重拍")
                }
                if (photoPath != null) {
                    PhotoThumb(path = photoPath, sizeDp = 72.dp)
                    IconButton(onClick = {
                        runCatching { File(photoPath!!).delete() }
                        photoPath = null
                    }) {
                        Icon(Icons.Default.Delete, contentDescription = "删除照片")
                    }
                } else {
                    Box(Modifier.size(72.dp), contentAlignment = Alignment.Center) {
                        Text("无照片", style = androidx.compose.material3.MaterialTheme.typography.labelSmall)
                    }
                }
            }

            Button(
                onClick = { onSave(title, location, remark, photoPath) },
                enabled = title.isNotBlank(),
                modifier = Modifier.fillMaxWidth()
            ) { Text("保存") }
            TextButton(onClick = onBack, modifier = Modifier.fillMaxWidth()) { Text("取消") }
        }
    }
}