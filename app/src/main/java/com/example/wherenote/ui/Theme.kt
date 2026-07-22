package com.example.wherenote.ui

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val LightColors = lightColorScheme(
    primary = Color(0xFF2E6F40),
    secondary = Color(0xFF5B8C5A),
    tertiary = Color(0xFF8B6B47)
)
private val DarkColors = darkColorScheme(
    primary = Color(0xFF8FD6A0),
    secondary = Color(0xFF9DBE9C),
    tertiary = Color(0xFFD0AE8B)
)

@Composable
fun WhereNoteTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = if (darkTheme) DarkColors else LightColors,
        content = content
    )
}