package com.example.wherenote.util

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import androidx.core.content.FileProvider
import java.io.File
import java.io.FileOutputStream

object PhotoUtil {
    /** 在 filesDir/photos 下新建一张空 jpg,返回 (文件, 授权给相机的 Uri)。 */
    fun newPhotoTarget(context: Context): Pair<File, Uri> {
        val dir = File(context.filesDir, "photos").apply { mkdirs() }
        val file = File(dir, "note_${System.currentTimeMillis()}.jpg")
        val authority = "${context.packageName}.fileprovider"
        return file to FileProvider.getUriForFile(context, authority, file)
    }

    /**
     * 原地压缩:长边缩到 maxEdge、JPEG 质量 quality,覆盖原文件。
     * 用 inSampleSize 先粗采样再精确缩放,避免一次性加载超大图 OOM。
     */
    fun compressInPlace(file: File, maxEdge: Int = 1080, quality: Int = 82) {
        val bounds = BitmapFactory.Options().apply { inJustDecodeBounds = true }
        BitmapFactory.decodeFile(file.absolutePath, bounds)
        val srcW = bounds.outWidth
        val srcH = bounds.outHeight
        if (srcW <= 0 || srcH <= 0) return
        val maxSrc = maxOf(srcW, srcH)

        var sample = 1
        while (maxSrc / sample > maxEdge * 2) sample *= 2
        val opts = BitmapFactory.Options().apply { inSampleSize = sample }
        val bmp = BitmapFactory.decodeFile(file.absolutePath, opts) ?: return

        val scaled = if (maxOf(bmp.width, bmp.height) > maxEdge) {
            val ratio = maxEdge.toFloat() / maxOf(bmp.width, bmp.height)
            Bitmap.createScaledBitmap(
                bmp,
                (bmp.width * ratio).toInt().coerceAtLeast(1),
                (bmp.height * ratio).toInt().coerceAtLeast(1),
                true
            )
        } else bmp

        FileOutputStream(file).use { scaled.compress(Bitmap.CompressFormat.JPEG, quality, it) }
        bmp.recycle()
        if (scaled !== bmp) scaled.recycle()
    }
}