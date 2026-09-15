package com.example.wherenote.util

import org.json.JSONObject
import java.io.File
import java.net.HttpURLConnection
import java.net.URL

data class UpdateInfo(
    val versionName: String,
    val versionCode: Int?,
    val downloadUrl: String
)

object UpdateApi {
    private const val UPDATE_URL = "https://w.wotty.app/api/update"

    fun checkForUpdate(): UpdateInfo {
        val response = request(UPDATE_URL)
        val json = JSONObject(response)
        return UpdateInfo(
            versionName = json.getString("versionName"),
            versionCode = if (json.isNull("versionCode")) null else json.getInt("versionCode"),
            downloadUrl = json.getString("downloadUrl")
        )
    }

    fun downloadApk(downloadUrl: String, targetFile: File): File {
        targetFile.parentFile?.mkdirs()
        val connection = openConnection(downloadUrl)

        try {
            val status = connection.responseCode
            if (status !in 200..299) {
                throw IllegalStateException("下载更新失败（HTTP " + status + "）")
            }

            connection.inputStream.use { input ->
                targetFile.outputStream().use { output ->
                    input.copyTo(output)
                }
            }
            return targetFile
        } finally {
            connection.disconnect()
        }
    }

    private fun request(url: String): String {
        val connection = openConnection(url)

        try {
            val status = connection.responseCode
            val body = (if (status in 200..299) connection.inputStream else connection.errorStream)
                ?.bufferedReader()
                ?.use { it.readText() }
                .orEmpty()

            if (status !in 200..299) {
                val serverMessage = runCatching { JSONObject(body).optString("error") }.getOrNull()
                throw IllegalStateException(
                    serverMessage?.takeIf { it.isNotBlank() } ?: "检查更新失败（HTTP " + status + "）"
                )
            }

            return body
        } finally {
            connection.disconnect()
        }
    }

    private fun openConnection(url: String): HttpURLConnection {
        return (URL(url).openConnection() as HttpURLConnection).apply {
            requestMethod = "GET"
            connectTimeout = 15_000
            readTimeout = 60_000
            instanceFollowRedirects = true
            useCaches = false
        }
    }
}
