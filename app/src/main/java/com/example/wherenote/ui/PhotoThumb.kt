package com.example.wherenote.ui

import android.graphics.BitmapFactory
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.ImageBitmap
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File

/** 按目标像素尺寸加载缩略图,避免大图 OOM。 */
@Composable
fun PhotoThumb(path: String?, sizeDp: Dp = 72.dp) {
    if (path.isNullOrBlank() || !File(path).exists()) return
    val reqPx = with(LocalDensity.current) { sizeDp.toPx() }.toInt().coerceAtLeast(64)
    var bmp by remember(path) { mutableStateOf<ImageBitmap?>(null) }
    LaunchedEffect(path) {
        bmp = withContext(Dispatchers.IO) {
            runCatching { decodeSampled(path, reqPx) }.getOrNull()
        }
    }
    bmp?.let { Image(bitmap = it, contentDescription = "照片", modifier = Modifier.size(sizeDp)) }
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