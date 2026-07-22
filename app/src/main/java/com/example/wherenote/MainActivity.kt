package com.example.wherenote

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.wherenote.data.Note
import com.example.wherenote.ui.AboutContent
import com.example.wherenote.ui.EditContent
import com.example.wherenote.ui.ListContent
import com.example.wherenote.ui.NoteViewModel
import com.example.wherenote.ui.WhereNoteTheme

private enum class Tab(val label: String) { REMEMBER("记住"), WHERE("东西在哪"), ABOUT("关于") }

class MainActivity : ComponentActivity() {
    private val vm: NoteViewModel by viewModels()

    @OptIn(ExperimentalMaterial3Api::class)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            WhereNoteTheme {
                var tab by remember { mutableStateOf(Tab.REMEMBER) }
                var editing by remember { mutableStateOf<Note?>(null) }
                var formToken by remember { mutableStateOf(0) }

                fun goRemember(note: Note?) { editing = note; tab = Tab.REMEMBER; formToken++ }

                val title = when {
                    tab == Tab.REMEMBER && editing != null -> "编辑记录"
                    tab == Tab.REMEMBER -> "记住"
                    tab == Tab.WHERE -> Tab.WHERE.label
                    else -> Tab.ABOUT.label
                }

                Scaffold(
                    topBar = { TopAppBar(title = { Text(title) }) },
                    bottomBar = {
                        NavigationBar(
                            modifier = Modifier.height(60.dp),
                            windowInsets = WindowInsets(0, 0, 0, 0),
                            tonalElevation = 0.dp
                        ) {
                            NavigationBarItem(
                                selected = tab == Tab.REMEMBER,
                                onClick = { goRemember(null) },
                                icon = { Icon(Icons.Default.Add, contentDescription = null) },
                                label = { Text(Tab.REMEMBER.label) }
                            )
                            NavigationBarItem(
                                selected = tab == Tab.WHERE,
                                onClick = { tab = Tab.WHERE },
                                icon = { Icon(Icons.Default.Search, contentDescription = null) },
                                label = { Text(Tab.WHERE.label) }
                            )
                            NavigationBarItem(
                                selected = tab == Tab.ABOUT,
                                onClick = { tab = Tab.ABOUT },
                                icon = { Icon(Icons.Default.Info, contentDescription = null) },
                                label = { Text(Tab.ABOUT.label) }
                            )
                        }
                    },
                    contentWindowInsets = WindowInsets(0, 0, 0, 0)
                ) { pad ->
                    Box(Modifier.padding(pad)) {
                        when (tab) {
                            Tab.REMEMBER -> androidx.compose.runtime.key(formToken) {
                                EditContent(
                                    editing = editing,
                                    onCancel = { tab = Tab.WHERE },
                                    onSave = { t, l, r, p ->
                                        if (editing == null) vm.add(t, l, r, p)
                                        else vm.update(editing!!.copy(
                                            title = t.trim(), location = l.trim(), remark = r.trim(), photoPath = p
                                        ))
                                        tab = Tab.WHERE
                                    }
                                )
                            }
                            Tab.WHERE -> ListContent(vm = vm, onEdit = { goRemember(it) })
                            Tab.ABOUT -> AboutContent()
                        }
                    }
                }
            }
        }
    }
}