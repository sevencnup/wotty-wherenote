package com.example.wherenote

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBars
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AddCircle
import androidx.compose.material.icons.filled.Eco
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.outlined.AddCircleOutline
import androidx.compose.material.icons.outlined.Info
import androidx.compose.material.icons.outlined.Search
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.wherenote.data.Note
import com.example.wherenote.ui.AboutContent
import com.example.wherenote.ui.EditContent
import com.example.wherenote.ui.ListContent
import com.example.wherenote.ui.NoteViewModel
import com.example.wherenote.ui.WhereNoteTheme

private enum class Tab(
    val label: String,
    val subLabel: String,
    val selectedIcon: ImageVector,
    val unselectedIcon: ImageVector
) {
    REMEMBER("记一笔", "记录位置", Icons.Filled.AddCircle, Icons.Outlined.AddCircleOutline),
    WHERE("东西在哪", "随查随找", Icons.Filled.Search, Icons.Outlined.Search),
    ABOUT("关于随记", "版本信息", Icons.Filled.Info, Icons.Outlined.Info)
}

class MainActivity : ComponentActivity() {
    private val vm: NoteViewModel by viewModels()

    @OptIn(ExperimentalMaterial3Api::class)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            WhereNoteTheme {
                var tab by remember { mutableStateOf(Tab.WHERE) }
                var editing by remember { mutableStateOf<Note?>(null) }
                var formToken by remember { mutableStateOf(0) }
                val notes by vm.notes.collectAsState()

                fun goRemember(note: Note?) {
                    editing = note
                    tab = Tab.REMEMBER
                    formToken++
                }

                val titleText = when {
                    tab == Tab.REMEMBER && editing != null -> "编辑随记"
                    tab == Tab.REMEMBER -> "记一笔"
                    tab == Tab.WHERE -> "东西在哪"
                    else -> "关于随记"
                }

                val subTitleText = when {
                    tab == Tab.REMEMBER && editing != null -> "更新物品所在位置与备注"
                    tab == Tab.REMEMBER -> "随手一记，不再翻箱倒柜"
                    tab == Tab.WHERE -> if (notes.isEmpty()) "暂无存档" else "共收录 ${notes.size} 件物品"
                    else -> "WhereNote · 简单实用的收纳备忘"
                }

                Scaffold(
                    topBar = {
                        WhereNoteTopBar(
                            title = titleText,
                            subtitle = subTitleText,
                            badgeCount = if (tab == Tab.WHERE) notes.size else null
                        )
                    },
                    bottomBar = {
                        WhereNoteBottomBar(
                            currentTab = tab,
                            onTabSelected = { selected ->
                                if (selected == Tab.REMEMBER) {
                                    goRemember(null)
                                } else {
                                    tab = selected
                                }
                            }
                        )
                    },
                    containerColor = MaterialTheme.colorScheme.background,
                    contentWindowInsets = WindowInsets(0, 0, 0, 0)
                ) { pad ->
                    Box(
                        Modifier
                            .fillMaxSize()
                            .padding(pad)
                    ) {
                        AnimatedContent(
                            targetState = tab to formToken,
                            transitionSpec = { fadeIn() togetherWith fadeOut() },
                            label = "TabTransition"
                        ) { (currentTab, _) ->
                            when (currentTab) {
                                Tab.REMEMBER -> {
                                    EditContent(
                                        editing = editing,
                                        onCancel = { tab = Tab.WHERE },
                                        onSave = { t, l, r, p ->
                                            if (editing == null) {
                                                vm.add(t, l, r, p)
                                            } else {
                                                vm.update(
                                                    editing!!.copy(
                                                        title = t.trim(),
                                                        location = l.trim(),
                                                        remark = r.trim(),
                                                        photoPath = p
                                                    )
                                                )
                                            }
                                            tab = Tab.WHERE
                                        }
                                    )
                                }
                                Tab.WHERE -> ListContent(
                                    vm = vm,
                                    onEdit = { goRemember(it) },
                                    onAddNew = { goRemember(null) }
                                )
                                Tab.ABOUT -> AboutContent()
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun WhereNoteTopBar(
    title: String,
    subtitle: String,
    badgeCount: Int? = null
) {
    Surface(
        color = MaterialTheme.colorScheme.surface,
        tonalElevation = 0.dp,
        modifier = Modifier
            .fillMaxWidth()
            .shadow(
                elevation = 3.dp,
                shape = RoundedCornerShape(bottomStart = 22.dp, bottomEnd = 22.dp),
                spotColor = MaterialTheme.colorScheme.primary.copy(alpha = 0.08f)
            )
            .clip(RoundedCornerShape(bottomStart = 22.dp, bottomEnd = 22.dp))
            .border(
                width = 1.dp,
                color = MaterialTheme.colorScheme.outlineVariant.copy(alpha = 0.6f),
                shape = RoundedCornerShape(bottomStart = 22.dp, bottomEnd = 22.dp)
            )
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .windowInsetsPadding(WindowInsets.statusBars)
                .padding(horizontal = 20.dp, vertical = 14.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(34.dp)
                            .clip(RoundedCornerShape(10.dp))
                            .background(
                                Brush.linearGradient(
                                    colors = listOf(
                                        MaterialTheme.colorScheme.primary,
                                        MaterialTheme.colorScheme.secondary
                                    )
                                )
                            ),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Filled.Eco,
                            contentDescription = null,
                            tint = Color.White,
                            modifier = Modifier.size(20.dp)
                        )
                    }
                    Text(
                        text = title,
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurface,
                        modifier = Modifier.padding(start = 10.dp)
                    )
                }

                if (badgeCount != null && badgeCount > 0) {
                    Surface(
                        color = MaterialTheme.colorScheme.primaryContainer,
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Text(
                            text = "$badgeCount 条",
                            style = MaterialTheme.typography.labelMedium,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.onPrimaryContainer,
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp)
                        )
                    }
                }
            }

            Spacer(Modifier.height(2.dp))
            Text(
                text = subtitle,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}

@Composable
private fun WhereNoteBottomBar(
    currentTab: Tab,
    onTabSelected: (Tab) -> Unit
) {
    Surface(
        color = MaterialTheme.colorScheme.surface,
        modifier = Modifier
            .fillMaxWidth()
            .shadow(
                elevation = 8.dp,
                shape = RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp),
                spotColor = MaterialTheme.colorScheme.primary.copy(alpha = 0.08f)
            )
            .clip(RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp))
            .border(
                width = 1.dp,
                color = MaterialTheme.colorScheme.outlineVariant.copy(alpha = 0.7f),
                shape = RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp)
            )
    ) {
        NavigationBar(
            modifier = Modifier
                .windowInsetsPadding(WindowInsets.navigationBars)
                .height(68.dp),
            containerColor = Color.Transparent,
            tonalElevation = 0.dp,
            windowInsets = WindowInsets(0, 0, 0, 0)
        ) {
            Tab.values().forEach { tab ->
                val selected = currentTab == tab
                NavigationBarItem(
                    selected = selected,
                    onClick = { onTabSelected(tab) },
                    icon = {
                        Icon(
                            imageVector = if (selected) tab.selectedIcon else tab.unselectedIcon,
                            contentDescription = tab.label,
                            modifier = Modifier.size(24.dp)
                        )
                    },
                    label = {
                        Text(
                            text = tab.label,
                            style = MaterialTheme.typography.labelMedium,
                            fontWeight = if (selected) FontWeight.Bold else FontWeight.Normal
                        )
                    },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = MaterialTheme.colorScheme.onPrimaryContainer,
                        selectedTextColor = MaterialTheme.colorScheme.primary,
                        indicatorColor = MaterialTheme.colorScheme.primaryContainer,
                        unselectedIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
                        unselectedTextColor = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                )
            }
        }
    }
}
