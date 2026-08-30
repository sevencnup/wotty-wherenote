package com.example.wherenote.ui

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Shapes
import androidx.compose.material3.Typography
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// 精致森绿质感设计体系调色板
val ForestGreenPrimary = Color(0xFF1E5B3A)
val ForestGreenPrimaryDark = Color(0xFF6ED19C)
val ForestGreenSecondary = Color(0xFF437055)
val ForestGreenSecondaryDark = Color(0xFFA5D1B8)
val WarmWoodTertiary = Color(0xFF8C6647)
val WarmWoodTertiaryDark = Color(0xFFD6B290)

val LightBackground = Color(0xFFF6F8F5)
val LightSurface = Color(0xFFFFFFFF)
val LightSurfaceVariant = Color(0xFFEDF3ED)
val LightOnSurface = Color(0xFF1B241E)
val LightOnSurfaceVariant = Color(0xFF5A665E)
val LightOutline = Color(0xFFD8E2D9)
val LightOutlineVariant = Color(0xFFE8EFE8)

val DarkBackground = Color(0xFF111713)
val DarkSurface = Color(0xFF18221B)
val DarkSurfaceVariant = Color(0xFF223027)
val DarkOnSurface = Color(0xFFE4EDE6)
val DarkOnSurfaceVariant = Color(0xFFA4B5A9)
val DarkOutline = Color(0xFF2E3E34)
val DarkOutlineVariant = Color(0xFF25332B)

val SuccessGreen = Color(0xFF2E7D32)
val AccentOrange = Color(0xFFE65100)

private val LightColors = lightColorScheme(
    primary = ForestGreenPrimary,
    onPrimary = Color.White,
    primaryContainer = Color(0xFFD3ECD8),
    onPrimaryContainer = Color(0xFF0A331E),
    secondary = ForestGreenSecondary,
    onSecondary = Color.White,
    secondaryContainer = Color(0xFFD7EADF),
    onSecondaryContainer = Color(0xFF122C1D),
    tertiary = WarmWoodTertiary,
    onTertiary = Color.White,
    tertiaryContainer = Color(0xFFF5E4D4),
    onTertiaryContainer = Color(0xFF331F0E),
    background = LightBackground,
    onBackground = LightOnSurface,
    surface = LightSurface,
    onSurface = LightOnSurface,
    surfaceVariant = LightSurfaceVariant,
    onSurfaceVariant = LightOnSurfaceVariant,
    outline = LightOutline,
    outlineVariant = LightOutlineVariant,
    error = Color(0xFFBA1A1A),
    onError = Color.White,
    errorContainer = Color(0xFFFFDAD6),
    onErrorContainer = Color(0xFF410002)
)

private val DarkColors = darkColorScheme(
    primary = ForestGreenPrimaryDark,
    onPrimary = Color(0xFF00391F),
    primaryContainer = Color(0xFF0F5231),
    onPrimaryContainer = Color(0xFF8CF4BA),
    secondary = ForestGreenSecondaryDark,
    onSecondary = Color(0xFF153824),
    secondaryContainer = Color(0xFF2B503B),
    onSecondaryContainer = Color(0xFFC0EDD3),
    tertiary = WarmWoodTertiaryDark,
    onTertiary = Color(0xFF4A280B),
    tertiaryContainer = Color(0xFF653D1C),
    onTertiaryContainer = Color(0xFFFFDCBE),
    background = DarkBackground,
    onBackground = DarkOnSurface,
    surface = DarkSurface,
    onSurface = DarkOnSurface,
    surfaceVariant = DarkSurfaceVariant,
    onSurfaceVariant = DarkOnSurfaceVariant,
    outline = DarkOutline,
    outlineVariant = DarkOutlineVariant,
    error = Color(0xFFFFB4AB),
    onError = Color(0xFF690005),
    errorContainer = Color(0xFF93000A),
    onErrorContainer = Color(0xFFFFDAD6)
)

val WhereNoteTypography = Typography(
    headlineMedium = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Bold,
        fontSize = 26.sp,
        lineHeight = 32.sp,
        letterSpacing = (-0.5).sp
    ),
    headlineSmall = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Bold,
        fontSize = 20.sp,
        lineHeight = 26.sp,
        letterSpacing = (-0.2).sp
    ),
    titleLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.SemiBold,
        fontSize = 18.sp,
        lineHeight = 24.sp
    ),
    titleMedium = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.SemiBold,
        fontSize = 16.sp,
        lineHeight = 22.sp
    ),
    titleSmall = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Medium,
        fontSize = 14.sp,
        lineHeight = 20.sp
    ),
    bodyLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 15.sp,
        lineHeight = 22.sp
    ),
    bodyMedium = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 14.sp,
        lineHeight = 20.sp
    ),
    bodySmall = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 12.sp,
        lineHeight = 16.sp
    ),
    labelLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.SemiBold,
        fontSize = 14.sp,
        lineHeight = 20.sp
    ),
    labelMedium = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Medium,
        fontSize = 12.sp,
        lineHeight = 16.sp
    ),
    labelSmall = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 11.sp,
        lineHeight = 14.sp
    )
)

val WhereNoteShapes = Shapes(
    extraSmall = RoundedCornerShape(8.dp),
    small = RoundedCornerShape(12.dp),
    medium = RoundedCornerShape(18.dp),
    large = RoundedCornerShape(24.dp),
    extraLarge = RoundedCornerShape(30.dp)
)

@Composable
fun WhereNoteTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = if (darkTheme) DarkColors else LightColors,
        typography = WhereNoteTypography,
        shapes = WhereNoteShapes,
        content = content
    )
}
