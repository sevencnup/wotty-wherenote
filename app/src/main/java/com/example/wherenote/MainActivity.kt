package com.example.wherenote

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.List
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import com.example.wherenote.data.Note
import com.example.wherenote.ui.AboutScreen
import com.example.wherenote.ui.EditScreen
import com.example.wherenote.ui.ListScreen
import com.example.wherenote.ui.NoteViewModel
import com.example.wherenote.ui.WhereNoteTheme

private enum class Tab(val label: String) { REMEMBER("记住"), WHERE("东西在哪"), ABOUT("关于") }

class MainActivity : ComponentActivity() {
    private val vm: NoteViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            WhereNoteTheme {
                var tab by remember { mutableStateOf(Tab.REMEMBER) }
                var editing by remember { mutableStateOf<Note?>(null) }
                // 每次进入「记住」都让表单重置一次(token 变化触发 key 重组)
                var formToken by remember { mutableStateOf(0) }

                fun goRemember(note: Note?) {
                    editing = note
                    tab = Tab.REMEMBER
                    formToken++
                }

                Scaffold(
                    bottomBar = {
                        NavigationBar {
                            NavigationBarItem(
                                selected = tab == Tab.REMEMBER,
                                onClick = { goRemember(null) },
                                icon = { Icon(Icons.Default.Add, contentDescription = null) },
                                label = { Text(Tab.REMEMBER.label) }
                            )
                            NavigationBarItem(
                                selected = tab == Tab.WHERE,
                                onClick = { tab = Tab.WHERE },
                                icon = { Icon(Icons.Default.List, contentDescription = null) },
                                label = { Text(Tab.WHERE.label) }
                            )
                            NavigationBarItem(
                                selected = Tab.ABOUT == tab,
                                onClick = { tab = Tab.ABOUT },
                                icon = { Icon(Icons.Default.Info, contentDescription = null) },
                                label = { Text(Tab.ABOUT.label) }
                            )
                        }
                    }
                ) { pad ->
                    Box(Modifier.padding(pad)) {
                        when (tab) {
                            Tab.REMEMBER -> androidx.compose.runtime.key(formToken) {
                                EditScreen(
                                    editing = editing,
                                    onBack = { tab = Tab.WHERE },
                                    onSave = { title, location, remark, photoPath ->
                                        if (editing == null) {
                                            vm.add(title, location, remark, photoPath)
                                        } else {
                                            vm.update(editing!!.copy(
                                                title = title.trim(),
                                                location = location.trim(),
                                                remark = remark.trim(),
                                                photoPath = photoPath
                                            ))
                                        }
                                        tab = Tab.WHERE
                                    }
                                )
                            }
                            Tab.WHERE -> ListScreen(
                                vm = vm,
                                onEdit = { goRemember(it) }
                            )
                            Tab.ABOUT -> AboutScreen()
                        }
                    }
                }
            }
        }
    }
}