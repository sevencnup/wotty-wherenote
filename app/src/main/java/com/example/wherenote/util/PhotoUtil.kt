package com.example.wherenote.util

import android.content.Context
import android.net.Uri
import androidx.core.content.FileProvider
import java.io.File

object PhotoUtil {
    /** 在 filesDir/photos 下新建一张空 jpg,返回 (文件, 授权给相机的 Uri)。 */
    fun newPhotoTarget(context: Context): Pair<File, Uri> {
        val dir = File(context.filesDir, "photos").apply { mkdirs() }
        val file = File(dir, "note_${System.currentTimeMillis()}.jpg")
        val authority = "${context.packageName}.fileprovider"
        return file to FileProvider.getUriForFile(context, authority, file)
    }
}