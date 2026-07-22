package com.example.wherenote

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import com.example.wherenote.data.Note
import com.example.wherenote.ui.EditScreen
import com.example.wherenote.ui.ListScreen
import com.example.wherenote.ui.NoteViewModel
import com.example.wherenote.ui.WhereNoteTheme

class MainActivity : ComponentActivity() {
    private val vm: NoteViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            WhereNoteTheme {
                var editing by remember { mutableStateOf<Note?>(null) }
                var screen by remember { mutableStateOf("list") }

                when (screen) {
                    "list" -> ListScreen(
                        vm = vm,
                        onAdd = { editing = null; screen = "edit" },
                        onEdit = { note -> editing = note; screen = "edit" }
                    )
                    "edit" -> EditScreen(
                        editing = editing,
                        onBack = { screen = "list" },
                        onSave = { title, location, remark, photoPath ->
                            if (editing == null) {
                                vm.add(title, location, remark, photoPath)
                            } else {
                                vm.update(editing!!.copy(title = title.trim(), location = location.trim(), remark = remark.trim(), photoPath = photoPath))
                            }
                            screen = "list"
                        }
                    )
                }
            }
        }
    }
}