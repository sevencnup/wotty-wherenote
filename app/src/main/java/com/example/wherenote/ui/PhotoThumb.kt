package com.example.wherenote.ui

import android.graphics.BitmapFactory
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.BrokenImage
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Image
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ImageBitmap
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File

/** 精致缩略图组件：带圆角裁剪、细边框高光与优雅占位状态 */
@Composable
fun PhotoThumb(
    path: String?,
    sizeDp: Dp = 72.dp,
    modifier: Modifier = Modifier,
    shape: RoundedCornerShape = RoundedCornerShape(14.dp),
    contentScale: ContentScale = ContentScale.Crop,
    onClick: (() -> Unit)? = null
) {
    val reqPx = with(LocalDensity.current) { sizeDp.toPx() }.toInt().coerceAtLeast(64)
    var bmp by remember(path) { mutableStateOf<ImageBitmap?>(null) }
    var isLoading by remember(path) { mutableStateOf(!path.isNullOrBlank()) }
    var isFailed by remember(path) { mutableStateOf(false) }

    LaunchedEffect(path) {
        if (path.isNullOrBlank() || !File(path).exists()) {
            isLoading = false
            bmp = null
            isFailed = false
            return@LaunchedEffect
        }
        isLoading = true
        isFailed = false
        val decoded = withContext(Dispatchers.IO) {
            runCatching { decodeSampled(path, reqPx) }.getOrNull()
        }
        isLoading = false
        if (decoded != null) {
            bmp = decoded
        } else {
            isFailed = true
        }
    }

    Box(
        modifier = modifier
            .size(sizeDp)
            .clip(shape)
            .background(MaterialTheme.colorScheme.surfaceVariant)
            .border(
                width = 1.dp,
                color = MaterialTheme.colorScheme.outlineVariant,
                shape = shape
            )
            .then(if (onClick != null) Modifier.clickable(onClick = onClick) else Modifier),
        contentAlignment = Alignment.Center
    ) {
        when {
            bmp != null -> {
                Image(
                    bitmap = bmp!!,
                    contentDescription = "记录照片，点击放大查看",
                    modifier = Modifier.fillMaxSize(),
                    contentScale = contentScale
                )
            }
            isLoading -> {
                CircularProgressIndicator(
                    modifier = Modifier.size(sizeDp * 0.35f),
                    strokeWidth = 2.dp,
                    color = MaterialTheme.colorScheme.primary
                )
            }
            isFailed -> {
                Icon(
                    imageVector = Icons.Default.BrokenImage,
                    contentDescription = "照片损坏",
                    tint = MaterialTheme.colorScheme.error.copy(alpha = 0.6f),
                    modifier = Modifier.size(sizeDp * 0.45f)
                )
            }
            else -> {
                Icon(
                    imageVector = Icons.Default.Image,
                    contentDescription = "无照片",
                    tint = MaterialTheme.colorScheme.outline.copy(alpha = 0.5f),
                    modifier = Modifier.size(sizeDp * 0.45f)
                )
            }
        }
    }
}

@Composable
fun PhotoPreviewDialog(
    path: String,
    onDismiss: () -> Unit
) {
    var bitmap by remember(path) { mutableStateOf<ImageBitmap?>(null) }
    var isLoading by remember(path) { mutableStateOf(true) }
    var isFailed by remember(path) { mutableStateOf(false) }

    LaunchedEffect(path) {
        val decoded = withContext(Dispatchers.IO) {
            runCatching { decodeFull(path) }.getOrNull()
        }
        isLoading = false
        if (decoded != null) {
            bitmap = decoded
        } else {
            isFailed = true
        }
    }

    Dialog(
        onDismissRequest = onDismiss,
        properties = DialogProperties(
            usePlatformDefaultWidth = false,
            decorFitsSystemWindows = false
        )
    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.Black.copy(alpha = 0.96f)),
            contentAlignment = Alignment.Center
        ) {
            when {
                bitmap != null -> {
                    Image(
                        bitmap = bitmap!!,
                        contentDescription = "放大查看照片",
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(horizontal = 12.dp, vertical = 28.dp),
                        contentScale = ContentScale.Fit
                    )
                }
                isLoading -> CircularProgressIndicator(
                    color = Color.White,
                    modifier = Modifier.size(42.dp)
                )
                isFailed -> Icon(
                    imageVector = Icons.Default.BrokenImage,
                    contentDescription = "照片加载失败",
                    tint = Color.White.copy(alpha = 0.75f),
                    modifier = Modifier.size(56.dp)
                )
            }

            IconButton(
                onClick = onDismiss,
                modifier = Modifier
                    .align(Alignment.TopEnd)
                    .padding(top = 12.dp, end = 12.dp)
                    .background(Color.Black.copy(alpha = 0.42f), RoundedCornerShape(50))
            ) {
                Icon(
                    imageVector = Icons.Default.Close,
                    contentDescription = "关闭图片预览",
                    tint = Color.White
                )
            }
        }
    }
}

private fun decodeSampled(path: String, reqPx: Int): ImageBitmap? {
    val bounds = BitmapFactory.Options().apply { inJustDecodeBounds = true }
    BitmapFactory.decodeFile(path, bounds)
    var sample = 1
    while (bounds.outHeight / sample > reqPx * 2 || bounds.outWidth / sample > reqPx * 2) {
        sample *= 2
    }
    val full = BitmapFactory.Options().apply { inSampleSize = sample }
    return BitmapFactory.decodeFile(path, full)?.asImageBitmap()
}

private fun decodeFull(path: String): ImageBitmap? =
    BitmapFactory.decodeFile(path)?.asImageBitmap()
